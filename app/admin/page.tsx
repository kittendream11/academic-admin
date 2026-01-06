'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './admin.module.css'
import { Item } from '@/lib/types'

export default function AdminPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', role: '' })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/items')
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingItem ? `/api/items/${editingItem.id}` : '/api/items'
      const method = editingItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchItems()
        setShowForm(false)
        setEditingItem(null)
        setFormData({ name: '', email: '', role: '' })
      }
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    setFormData({ name: item.name, email: item.email, role: item.role })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return

    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchItems()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingItem(null)
    setFormData({ name: '', email: '', role: '' })
  }

  if (loading) {
    return <div className={styles.loading}>Memuat data...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Panel</h1>
        <Link href="/" className={styles.backButton}>
          ← Kembali
        </Link>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => setShowForm(true)}
          className={styles.addButton}
        >
          + Tambah Data Baru
        </button>
      </div>

      {showForm && (
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>
            {editingItem ? 'Edit Data' : 'Tambah Data Baru'}
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nama</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingItem ? 'Update' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  Tidak ada data. Silakan tambah data baru.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(item)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className={styles.deleteButton}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
