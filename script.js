// Menggunakan path relatif agar jalan di localhost maupun di server cloud (Railway/Render)
const API_URL = '/api/data'; 

async function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value.trim();

    if (!taskName) {
        alert("Waduh, tugasnya masih kosong nih!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama: taskName })
        });

        if (response.ok) {
            input.value = '';
            ambilData();
        }
    } catch (error) {
        console.error("Gagal menambah data:", error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        });
        if (response.ok) {
            ambilData();
        }
    } catch (error) {
        console.error("Gagal menghapus data:", error);
    }
}

async function ambilData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const list = document.getElementById('daftar-tugas');
        list.innerHTML = ''; 

        data.forEach(item => {
            let li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <strong>${item.nama}</strong> - <span class="status">${item.status}</span>
                <button onclick="deleteTask(${item.id})" style="margin-left:10px; cursor:pointer; background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px;">Hapus</button>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Gagal memuat data:", error);
    }
}

document.addEventListener('DOMContentLoaded', ambilData);