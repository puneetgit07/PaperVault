import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabaseClient";
const collegeData = {
  "GL Bajaj": {
  "B.Tech": {
    CSE: {
      "Semester 1": [
        "Mathematics-I",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 2": [
        "Mathematics-II",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 3": [
        "Data Structure",
        "COA",
        "Maths-IV",
        "DSTL",
        "TC",
        "PYTHON"
      ]
    },

    AI: {
      "Semester 1": [
        "Mathematics-I",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 2": [
        "Mathematics-II",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 3": [
        "Data Structure",
        "COA",
        "Maths-IV",
        "DSTL",
        "TC",
        "PYTHON"
      ]
    },

    AIML: {
      "Semester 1": [
        "Mathematics-I",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 2": [
        "Mathematics-II",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 3": [
        "Data Structure",
        "COA",
        "DE",
        "DSTL",
        "UHV",
        "PYTHON"
      ]
    },

    IT: {
      "Semester 1": [
        "Mathematics-I",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 2": [
        "Mathematics-II",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "Programming for Problem Solving",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 3": [
        "Data Structure",
        "COA",
        "Maths-IV",
        "DSTL",
        "TC",
        "PYTHON"
      ]
    },
    DS: {
      "Semester 1": [
        "Mathematics-I",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "PPS",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 2": [
        "Mathematics-II",
        "Physics",
        "Chemistry",
        "Soft Skills",
        "PPS",
        "EVS",
        "Electrical Engineering",
        "Electronics Engineering",
        "Mechanical"
      ],
      "Semester 3": [
        "Data Structure",
        "COA",
        "Maths-IV",
        "DSTL",
        "TC",
        "PYTHON"
      ]
    }
  }
},

  "Galgotias University": {
    "B.Tech": {
      CSE: {
        "Semester 1": ["Mathematics-I", "Physics", "Programming"],
        "Semester 2": ["Mathematics-II", "Data Structures", "Digital Logic"],
        "Semester 3": ["DBMS", "Operating System", "Computer Networks"],
      },
    },
  },
};

function App() {
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [uploadCollege, setUploadCollege] = useState("");
  const [uploadCourse, setUploadCourse] = useState("");
  const [uploadBranch, setUploadBranch] = useState("");
  const [uploadSemester, setUploadSemester] = useState("");
  const [uploadSubject, setUploadSubject] = useState("");
  const [uploadYear, setUploadYear] = useState("");
  const [uploadExamType, setUploadExamType] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [paperData, setPaperData] = useState([]);
  const [pendingPapers, setPendingPapers] = useState([]);
  const [rejectedPapers, setRejectedPapers] = useState([]);
    useEffect(() => {
  const fetchPapers = async () => {
    const { data, error } = await supabase
      .from("papers")
      .select("*");

    if (error) {
      console.error("Error fetching papers:", error);
      return;
    }

    console.log("Papers from Supabase:", data);

    setPaperData(data);
  };

  fetchPapers();
}, []);

  const courses = college
    ? Object.keys(collegeData[college])
    : [];

  const branches =
    college && course
      ? Object.keys(collegeData[college][course])
      : [];

  const semesters =
    college && course && branch
      ? Object.keys(collegeData[college][course][branch])
      : [];

  const subjects =
    college && course && branch && semester
      ? collegeData[college][course][branch][semester]
      : [];

  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
    setCourse("");
    setBranch("");
    setSemester("");
    setSubject("");
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
    setBranch("");
    setSemester("");
    setSubject("");
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    setSemester("");
    setSubject("");
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubject("");
  };
  const handleDownload = async (paper) => {
  try {
    const response = await fetch(paper.pdf_url);

    if (!response.ok) {
      throw new Error("Failed to fetch PDF");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    link.download = `${paper.subject}-${paper.year}-${paper.exam_type}.pdf`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Download error:", error);
    alert("Download failed. Please try again.");
  }
};
  const handleUpload = async () => {
  if (
    !uploadCollege ||
    !uploadCourse ||
    !uploadBranch ||
    !uploadSemester ||
    !uploadSubject ||
    !uploadYear ||
    !uploadExamType ||
    !uploadFile
  ) {
    alert("Please fill all fields and select a PDF.");
    return;
  }

  if (uploadFile.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return;
  }
  const currentYear = new Date().getFullYear();
  const enteredYear = Number(uploadYear);

    const minimumYear = currentYear - 5;

if (
  !/^\d{4}$/.test(uploadYear) ||
  enteredYear < minimumYear ||
  enteredYear > currentYear
) {
  alert(
    `Only papers from the last 5 years are allowed (${minimumYear}-${currentYear}).`
  );
  return;
}
  const maxSize = 10 * 1024 * 1024; // 10 MB

if (uploadFile.size > maxSize) {
  alert("PDF size must be less than 10 MB.");
  return;
}

  try {
    setUploading(true);
      const { data: existingPapers, error: duplicateError } = await supabase
  .from("papers")
  .select("id, status")
  .eq("college", uploadCollege)
  .eq("course", uploadCourse)
  .eq("branch", uploadBranch)
  .eq("semester", uploadSemester)
  .eq("subject", uploadSubject)
  .eq("year", Number(uploadYear))
  .eq("exam_type", uploadExamType);

if (duplicateError) {
  throw duplicateError;
}

if (existingPapers && existingPapers.length > 0) {
  alert(
    "This paper already exists for the selected details. Please upload a different paper."
  );
  return;
}
    // Unique file name
    const fileName = `${Date.now()}-${uploadFile.name}`;

    // Upload PDF to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("papers")
      .upload(fileName, uploadFile);

    if (storageError) {
      throw storageError;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("papers")
      .getPublicUrl(fileName);

    const pdfUrl = urlData.publicUrl;

    // Insert paper information into database
    const { error: dbError } = await supabase
      .from("papers")
      .insert([
        {
          college: uploadCollege,
          course: uploadCourse,
          branch: uploadBranch,
          semester: uploadSemester,
          subject: uploadSubject,
          year: Number(uploadYear),
          exam_type: uploadExamType,
          pdf_url: pdfUrl,
        },
      ]);

    if (dbError) {
  await supabase.storage
    .from("papers")
    .remove([fileName]);

  throw dbError;
}

    alert(
  "Paper uploaded successfully! 🎉\n\nYour paper is now pending admin approval."
);

// Refresh papers
const { data } = await supabase
  .from("papers")
  .select("*");

setPaperData(data || []);

// Reset upload form
      setUploadCollege("");
      setUploadCourse("");
      setUploadBranch("");
      setUploadSemester("");
      setUploadSubject("");
      setUploadYear("");
      setUploadExamType("");
      setUploadFile(null);

      // Close form
      setShowUpload(false);

  } catch (error) {
  console.error("Upload error:", error);

  alert(
    "Upload failed. Please check your PDF and try again."
  );
} finally {
  setUploading(false);
}
};
const fetchPendingPapers = async () => {
  const { data, error } = await supabase
    .from("papers")
    .select("*")
    .eq("status", "pending")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching pending papers:", error);
    return;
  }

  setPendingPapers(data || []);
};
const fetchRejectedPapers = async () => {
  const { data, error } = await supabase
    .from("papers")
    .select("*")
    .eq("status", "rejected")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching rejected papers:", error);
    return;
  }

  setRejectedPapers(data || []);
};
const refreshAdminPapers = async () => {
  await fetchPendingPapers();
  await fetchRejectedPapers();

  const { data, error } = await supabase
    .from("papers")
    .select("*");

  if (error) {
    console.error("Refresh error:", error);
    return;
  }

  setPaperData(data || []);
};
const handleApprove = async (paperId) => {
  console.log("Approve clicked, ID:", paperId);

  const { data, error } = await supabase
    .from("papers")
    .update({ status: "approved" })
    .eq("id", paperId)
    .select();

  console.log("Updated data:", data);
  console.log("Update error:", error);

  if (error) {
    alert("Approve failed: " + error.message);
    return;
  }

  alert("Paper approved successfully! ✅");

  await fetchPendingPapers();

  const { data: allPapers, error: fetchError } = await supabase
    .from("papers")
    .select("*");

  console.log("All papers:", allPapers);
  console.log("Fetch error:", fetchError);

  if (!fetchError) {
    setPaperData(allPapers || []);
  }
};
const handleReject = async (paperId) => {
  const confirmed = window.confirm(
    "Are you sure you want to reject this paper?"
  );

  if (!confirmed) {
    return;
  }

  console.log("Reject clicked, ID:", paperId);

  const { error } = await supabase
    .from("papers")
    .update({ status: "rejected" })
    .eq("id", paperId);

  if (error) {
    console.error("Reject error:", error);
    alert("Reject failed: " + error.message);
    return;
  }

  alert("Paper rejected ❌");

  await fetchPendingPapers();

  const { data: allPapers } = await supabase
    .from("papers")
    .select("*");

  setPaperData(allPapers || []);
};
const handleRestore = async (paperId) => {
  const confirmed = window.confirm(
    "Move this paper back to pending?"
  );

  if (!confirmed) {
    return;
  }

  const { error } = await supabase
    .from("papers")
    .update({ status: "pending" })
    .eq("id", paperId);

  if (error) {
    console.error("Restore error:", error);
    alert("Restore failed: " + error.message);
    return;
  }

  alert("Paper moved back to pending! 🔄");

  await fetchPendingPapers();
  await fetchRejectedPapers();

  const { data: allPapers } = await supabase
    .from("papers")
    .select("*");

  setPaperData(allPapers || []);
};
  const filteredPapers = paperData.filter((paper) => {
  const matchesFilters =
    paper.status === "approved" &&
    paper.college?.trim() === college.trim() &&
    paper.course?.trim() === course.trim() &&
    paper.branch?.trim() === branch.trim() &&
    paper.semester?.trim() === semester.trim() &&
    paper.subject?.trim() === subject.trim();

  const matchesSearch =
    paper.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.exam_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(paper.year).includes(searchQuery);

  return matchesFilters && matchesSearch;
});

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
      
  <div className="logo">
  <img
    src="/papervault-logo.png"
    alt="PaperVault"
    className="logo-image"
  />
</div>

  <div className="nav-links">

    <a href="#home">Home</a>

    <a href="#browse">Browse Papers</a>
     <button
  className="admin-button"
  onClick={() => {
    setShowAdmin(true);
    fetchPendingPapers();
    fetchRejectedPapers();
  }}
>
  👑 Admin
</button>
    <button
      className="upload-button"
      onClick={() => setShowUpload(true)}
    >
      + Upload Paper
    </button>

  </div>

</nav>
{/* Admin Panel */}
  {showAdmin && (
    <div className="admin-panel">

      <div className="admin-header">

        <div>
          <h2>👑 Admin Panel</h2>
          <p>Manage, review and approve uploaded question papers</p>
        </div>

        <button
          className="close-button"
          onClick={() => setShowAdmin(false)}
        >
          ✕
        </button>

      </div>

      <div className="admin-content">
        <div className="admin-stats">
  <div className="admin-stat-card">
    <span>⏳</span>
    <div>
      <strong>{pendingPapers.length}</strong>
      <small>Pending</small>
    </div>
  </div>

  <div className="admin-stat-card">
    <span>❌</span>
    <div>
      <strong>{rejectedPapers.length}</strong>
      <small>Rejected</small>
    </div>
  </div>

  <div className="admin-stat-card">
    <span>✅</span>
    <div>
      <strong>
        {paperData.filter((paper) => paper.status === "approved").length}
      </strong>
      <small>Approved</small>
    </div>
  </div>
</div>

  <div className="admin-section-header">
  <h3>
    Pending Papers
    <span className="admin-count">{pendingPapers.length}</span>
  </h3>

  <button
    className="refresh-button"
    onClick={refreshAdminPapers}
  >
    🔄 Refresh
  </button>
</div>

  {pendingPapers.length === 0 ? (
    <p className="admin-note">
      🎉 No pending papers right now.
    </p>
  ) : (
    <div className="pending-list">

      {pendingPapers.map((paper) => (
        <div className="pending-card" key={paper.id}>

          <div className="pending-info">
              <span className="status-badge pending-badge">
                ⏳ Pending Review
              </span>
            <h4>{paper.subject}</h4>

            <p>
  <strong>{paper.year}</strong>
  <span> • </span>
  <span className="exam-type">{paper.exam_type}</span>
</p>

            <span>
              {paper.college} • {paper.course} •{" "}
              {paper.branch} • {paper.semester}
            </span>

          </div>

          <div className="pending-actions">

            <a
              href={paper.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button"
            >
              View PDF ↗
            </a>

            <button
              className="approve-button"
              onClick={() => handleApprove(paper.id)}
            >
              ✅ Approve
             </button>

            <button
                className="reject-button"
                onClick={() => handleReject(paper.id)}
              >
               ❌ Reject
            </button>

          </div>

        </div>
      ))}

    </div>
  )}

  <div className="rejected-section">

  <h3>
  ❌ Rejected Papers
  <span className="admin-count">{rejectedPapers.length}</span>
</h3>

  {rejectedPapers.length === 0 ? (
    <p className="admin-note">
      No rejected papers.
    </p>
  ) : (
    <div className="pending-list">

      {rejectedPapers.map((paper) => (
        <div className="pending-card" key={paper.id}>

          <div className="pending-info">
              <span className="status-badge rejected-badge">
                ❌ Rejected
            </span>
            <h4>{paper.subject}</h4>

            <p>
              <strong>{paper.year}</strong>
              <span> • </span>
              {paper.exam_type}
            </p>

            <span>
              {paper.college} • {paper.course} •{" "}
              {paper.branch} • {paper.semester}
            </span>

          </div>

          <div className="pending-actions">

      <a
      href={paper.pdf_url}
      target="_blank"
      rel="noopener noreferrer"
      className="view-button"
    >
      View PDF ↗
      </a>

      <button
      className="approve-button"
      onClick={() => handleRestore(paper.id)}
      >
      ♻️ Restore
      </button>

      </div>

        </div>
      ))}

    </div>
  )}

</div>
    </div>
    </div>
  )}

       {showUpload && (
  <div className="upload-box">
    <h2>Upload Question Paper</h2>

    <p>Upload a previous-year question paper.</p>

    <button
      className="close-button"
      onClick={() => setShowUpload(false)}
    >
      ✕
    </button>

    <div className="upload-form">

      <select
  value={uploadCollege}
  onChange={(e) => setUploadCollege(e.target.value)}
>
  <option value="">Select College</option>

  {Object.keys(collegeData).map((collegeName) => (
    <option key={collegeName} value={collegeName}>
      {collegeName}
    </option>
  ))}
</select>

      <select
  value={uploadCourse}
  onChange={(e) => {
    setUploadCourse(e.target.value);
    setUploadBranch("");
    setUploadSemester("");
    setUploadSubject("");
  }}
  disabled={!uploadCollege}
>
  <option value="">Select Course</option>

  {uploadCollege &&
    Object.keys(collegeData[uploadCollege]).map((courseName) => (
      <option key={courseName} value={courseName}>
        {courseName}
      </option>
    ))}
</select>
      <select
  value={uploadBranch}
  onChange={(e) => {
    setUploadBranch(e.target.value);
    setUploadSemester("");
    setUploadSubject("");
  }}
  disabled={!uploadCourse}
>
  <option value="">Select Branch</option>

  {uploadCollege &&
    uploadCourse &&
    Object.keys(collegeData[uploadCollege][uploadCourse]).map(
      (branchName) => (
        <option key={branchName} value={branchName}>
          {branchName}
        </option>
      )
    )}
</select>

      <select
  value={uploadSemester}
  onChange={(e) => {
    setUploadSemester(e.target.value);
    setUploadSubject("");
  }}
  disabled={!uploadBranch}
>
  <option value="">Select Semester</option>

  {uploadCollege &&
    uploadCourse &&
    uploadBranch &&
    Object.keys(
      collegeData[uploadCollege][uploadCourse][uploadBranch]
    ).map((semesterName) => (
      <option key={semesterName} value={semesterName}>
        {semesterName}
      </option>
    ))}
</select>

      <select
  value={uploadSubject}
  onChange={(e) => setUploadSubject(e.target.value)}
  disabled={!uploadSemester}
>
  <option value="">Select Subject</option>

  {uploadCollege &&
    uploadCourse &&
    uploadBranch &&
    uploadSemester &&
    collegeData[uploadCollege][uploadCourse][uploadBranch][uploadSemester].map(
      (subjectName) => (
        <option key={subjectName} value={subjectName}>
          {subjectName}
        </option>
      )
    )}
</select>

      <input
  type="number"
  placeholder="Year"
  min={new Date().getFullYear() - 5}
  max={new Date().getFullYear()}
  value={uploadYear}
  onChange={(e) => setUploadYear(e.target.value)}
/>

      <select
  value={uploadExamType}
  onChange={(e) => setUploadExamType(e.target.value)}
>
  <option value="">Select Exam Type</option>
  <option value="ST1">ST1</option>
  <option value="PUT">PUT</option>
  <option value="AKTU">AKTU</option>
</select>
<small className="upload-hint">
  📄 Only PDF files • Maximum size: 10 MB
</small>

      <input
  type="file"
  accept=".pdf"
  onChange={(e) => setUploadFile(e.target.files[0])}
/>
{uploadFile && (
  <div className="selected-file">
    <p>📄 {uploadFile.name}</p>
    <span>
      {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB
    </span>
  </div>
)}

      <button
  className="submit-upload"
  onClick={handleUpload}
  disabled={uploading}
>
  {uploading ? "Uploading..." : "Upload Paper"}
</button>

    </div>
  </div>
)}
      {/* Hero */}
      <section className="hero" id="home">

  <div className="hero-badge">
    🎓 Built for Students
  </div>

  <h1>
    Previous Papers.
    <br />
    <span>Better Preparation.</span>
  </h1>

  <p>
    Find previous-year question papers from your college,
    branch and semester — all in one place.
  </p>

  <div className="hero-actions">

    <a href="#browse" className="hero-button">
      Browse Papers ↓
    </a>

    <button
      className="hero-upload-button"
      onClick={() => setShowUpload(true)}
    >
      Upload a Paper
    </button>

  </div>

</section>

      {/* Browse */}
      <section className="browse" id="browse">

        <h2>Find Your Question Paper</h2>

        <div className="filters">

          {/* College */}
          <select value={college} onChange={handleCollegeChange}>
            <option value="">Select College</option>

            {Object.keys(collegeData).map((collegeName) => (
              <option key={collegeName} value={collegeName}>
                {collegeName}
              </option>
            ))}
          </select>


          {/* Course */}
          <select
            value={course}
            onChange={handleCourseChange}
            disabled={!college}
          >
            <option value="">Select Course</option>

            {courses.map((courseName) => (
              <option key={courseName} value={courseName}>
                {courseName}
              </option>
            ))}
          </select>


          {/* Branch */}
          <select
            value={branch}
            onChange={handleBranchChange}
            disabled={!course}
          >
            <option value="">Select Branch</option>

            {branches.map((branchName) => (
              <option key={branchName} value={branchName}>
                {branchName}
              </option>
            ))}
          </select>


          {/* Semester */}
          <select
            value={semester}
            onChange={handleSemesterChange}
            disabled={!branch}
          >
            <option value="">Select Semester</option>

            {semesters.map((semesterName) => (
              <option key={semesterName} value={semesterName}>
                {semesterName}
              </option>
            ))}
          </select>


          {/* Subject */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={!semester}
          >
            <option value="">Select Subject</option>

            {subjects.map((subjectName) => (
              <option key={subjectName} value={subjectName}>
                {subjectName}
              </option>
            ))}
          </select>

        </div>
<div className="search-box">

  <span className="search-icon">🔍</span>

  <input
    type="text"
    placeholder="Search by subject, year or exam type..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  {searchQuery && (
    <button
      className="clear-search"
      onClick={() => setSearchQuery("")}
    >
      ✕
    </button>
  )}

</div>
        {/* Selected Information */}
        {subject && (
          <div className="selection-box">

            <h3>Selected</h3>

            <p>
              {college} → {course} → {branch} → {semester}
            </p>

            <strong>{subject}</strong>

          </div>
        )}
        {subject && (
  <div className="papers-section">

    <div className="papers-header">
  <h2>Available Papers</h2>

  <span className="paper-count">
    {filteredPapers.length} paper{filteredPapers.length !== 1 ? "s" : ""}
  </span>
</div>

    {filteredPapers.length === 0 ? (
      <div className="empty-state">
  <div className="empty-icon">📚</div>

  <h3>No papers available yet</h3>

  <p>
    We couldn't find any approved papers for this selection.
  </p>

  <span>
    Try another subject or upload a question paper to help other students.
  </span>
</div>
    ) : (
      <div className="paper-grid">

        {filteredPapers.map((paper) => (
  <div className="paper-card" key={paper.id}>

    <div className="paper-icon">
      📄
    </div>

    <div className="paper-info">

      <h3>{paper.subject}</h3>

      <p>
        <strong>{paper.year}</strong>
        <span> • </span>
        {paper.exam_type}
      </p>

      <span>
        {paper.college} • {paper.branch} • {paper.semester}
      </span>

    </div>

    <div className="paper-actions">

      <a
        href={paper.pdf_url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-button"
      >
        View Paper ↗
      </a>

      <button
  className="download-button"
  onClick={() => handleDownload(paper)}
  >
  Download
  </button>

    </div>

  </div>
))}

      </div>
    )}

  </div>
)}

            </section>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>
              Previous papers. Better preparation.
            </p>
          </div>

          <div className="footer-links">
  <a href="#home">Home</a>
  <a href="#browse">Browse Papers</a>

  <button onClick={() => setShowUpload(true)}>
    Upload Paper
  </button>

  <a href="mailto:papervault34@gmail.com">
    Feedback / Contact
  </a>
</div>

        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PaperVault</span>
          <span>Built for Students 🎓</span>
        </div>

      </footer>

    </div>
  );
}

export default App;