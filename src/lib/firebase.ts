import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  writeBatch,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import type { Candidato, Entrega, EntregaUpdate, StatusCandidato } from '../types'
import { SECOES_POR_MODALIDADE } from './constants'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// ── Candidatos ────────────────────────────────────────────────────────────────

export async function getCandidatos(): Promise<Candidato[]> {
  const q = query(collection(db, 'candidatos'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Candidato))
}

export async function getCandidato(id: string): Promise<Candidato | null> {
  const snap = await getDoc(doc(db, 'candidatos', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Candidato
}

export async function criarCandidato(
  dados: Omit<Candidato, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> {
  const now = serverTimestamp() as Timestamp
  const ref = await addDoc(collection(db, 'candidatos'), {
    ...dados,
    createdAt: now,
    updatedAt: now,
  })

  // Inicializa todas as entregas da modalidade como "pendente"
  const batch = writeBatch(db)
  const secoes = SECOES_POR_MODALIDADE[dados.modalidade]
  for (const secao of secoes) {
    const entregaRef = doc(collection(db, 'candidatos', ref.id, 'entregas'))
    batch.set(entregaRef, {
      secao,
      status: 'pendente',
      nota: null,
      notaRevisao: '',
      observacoes: '',
      dataEntrega: null,
      dataAvaliacao: null,
      avaliador: '',
      updatedAt: now,
    })
  }
  await batch.commit()

  return ref.id
}

export async function atualizarStatusCandidato(
  id: string,
  status: StatusCandidato,
): Promise<void> {
  await updateDoc(doc(db, 'candidatos', id), {
    status,
    updatedAt: serverTimestamp(),
  })
}

export async function deletarCandidato(id: string): Promise<void> {
  // Remove entregas antes de remover o candidato
  const entregasSnap = await getDocs(collection(db, 'candidatos', id, 'entregas'))
  const batch = writeBatch(db)
  entregasSnap.docs.forEach(d => batch.delete(d.ref))
  batch.delete(doc(db, 'candidatos', id))
  await batch.commit()
}

// ── Entregas ──────────────────────────────────────────────────────────────────

export async function getEntregas(candidatoId: string): Promise<Entrega[]> {
  const snap = await getDocs(collection(db, 'candidatos', candidatoId, 'entregas'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Entrega))
}

export async function atualizarEntrega(
  candidatoId: string,
  entregaId: string,
  dados: Omit<EntregaUpdate, 'updatedAt'>,
): Promise<void> {
  await updateDoc(doc(db, 'candidatos', candidatoId, 'entregas', entregaId), {
    ...dados,
    updatedAt: serverTimestamp(),
  })
}

export { Timestamp, serverTimestamp }
