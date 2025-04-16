

# 🤖 Robot Position Tracker

This project is a full-stack web application that visualizes robot positions over time using data from CSV files.  
It uses **Flask** (backend), **React.js** (frontend), and **Docker** to run everything with a single command.

---

## 📦 How to Run

> **Pre-requisites:** Docker Desktop must be installed and running.

1. Open Git Bash (on Windows)
2. Navigate to the project directory
3. Run:

```bash
./run.sh
```

4. Open your browser and go to:  
👉 http://localhost:8000

---

## 📁 Folder Structure

- `backend/` – Flask backend with APIs and CSV parsing logic
- `frontend/` – React frontend (built into `build/`)
- `Dockerfile` – Combines frontend and backend into one container
- `run.sh` – Script to build and run everything
- `README.md` – Project info and instructions

---

## 🧪 Features

- Live robot position markers (SVG)
- Timeline slider with play, pause, and fast-forward
- Robot names and colors from CSV data
- Fully Dockerized – no manual setup needed

---

## 📊 Data Format

### `robot_info_data.csv`

| id | robot_name | robot_type |
|----|------------|------------|
| 1  | Husky1     | Husky      |
| 2  | Husky2     | Husky      |

### `robot_data.csv`

| robot_live_id | ros_time (sec, nanosec) | robot_type | status | topo_map_pos (x, y, ...) |

Only the first two values of `topo_map_pos` are used as coordinates.

---

## 👤 Developer

**Kiran Kumar Reddy Vadlapally**  
MS in Computer Science, Michigan Technological University  
📧 vadlapallykiran@gmail.com  
📅 April 2025

---
```

---
