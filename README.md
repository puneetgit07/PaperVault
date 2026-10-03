# PaperVault

> **Previous papers. Better preparation.**

PaperVault is a student-focused web platform for discovering and sharing previous-year college question papers in one organized place.

## 🚀 Live Demo

https://papervault-puce.vercel.app/

## 📦 Source Code

https://github.com/puneetgit07/PaperVault

## 🎯 Problem

Students often search for previous-year question papers through scattered WhatsApp groups, Telegram channels, class drives, or individual seniors. Papers can be difficult to find, duplicated, poorly organized, or unavailable to juniors.

PaperVault aims to make the process simpler by organizing papers around:

**College → Course → Branch → Semester → Subject**

## 💡 Solution

PaperVault provides a centralized repository where students can:

- Browse papers by college, course, branch, semester and subject
- Search papers by subject, year or exam type
- View PDFs directly
- Download available papers
- Upload question papers for other students
- Submit uploads for admin review

An admin can review submitted papers and approve, reject, or restore them.

## ✨ Current MVP Features

- College-wise paper organization
- Course, branch and semester filtering
- Subject-based paper browsing
- Search by subject, year and exam type
- PDF upload
- PDF view and download
- Upload validation
- Duplicate-paper checking
- Last-five-years upload restriction
- 10 MB PDF size limit
- Admin authentication
- Admin approval/rejection workflow
- Rejected-paper restore workflow
- Supabase database and storage
- Vercel deployment
- Responsive student-oriented UI

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend / Cloud
- Supabase
  - PostgreSQL database
  - Authentication
  - Storage

### Deployment
- Vercel

### Version Control
- Git
- GitHub

## 🧩 How It Works

1. A student selects a college.
2. They select the course and branch.
3. They select a semester.
4. They select a subject.
5. PaperVault fetches approved papers matching the selection.
6. Students can view or download the paper.
7. Students can upload new PDF papers.
8. Uploaded papers enter a pending-review state.
9. An authenticated admin reviews the submission.
10. Approved papers become available to students.

## 🔐 Moderation & Security

PaperVault uses Supabase authentication for the admin panel.

For the MVP:
- Student uploads are allowed through the public upload flow.
- Uploaded papers start as `pending`.
- Only the configured admin account can update paper status through the database policy.
- The public browsing flow only displays papers with `approved` status.

## 📁 Project Structure

```text
PaperVault/
├── public/
│   ├── papervault-logo.png
│   └── sample/public assets
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── lib/
│       └── supabaseClient.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Run Locally

Clone the repository:

```bash
git clone https://github.com/puneetgit07/PaperVault.git
cd PaperVault
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite.

> Never commit `.env` or expose Supabase secrets in the repository.

## 🗃️ Supabase Data Model

The main `papers` table stores:

- `id`
- `college`
- `course`
- `branch`
- `semester`
- `subject`
- `year`
- `exam_type`
- `pdf_url`
- `status`

Supported upload exam types in the current MVP:

- ST1
- PUT
- AKTU

## 🌱 Future Roadmap

Planned improvements include:

- More colleges and complete semester-wise subject coverage
- Student accounts and personal paper collections
- Better moderation and reporting tools
- Paper metadata extraction
- AI-assisted paper/topic analysis
- Topic-wise question trends
- Improved analytics for students and administrators
- Community contribution history

These are roadmap ideas, not claims about the current MVP.

## 🏆 CodeSprint

PaperVault is being developed as an open-source MVP for **CodeSprint by Elite Coders 2026**.

The project focuses on a practical student problem: making previous-year question papers easier to discover, contribute, review and reuse.

## 👥 Team

Add all CodeSprint team members here before submission:

- Member 1 — Puneet Singh / Frontend , Backend/cloud
- Member 2 — Priyanshi Singh / Deployment , Version Control

## 📄 License

This project is released under the MIT License.

See `LICENSE` for details.
