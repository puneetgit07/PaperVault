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
      ],
      "Semester 5": [
        "DBMS",
        "AI",
        "DAA",
        "Object Oriented System Design",
        "Cloud Computing",
        "Data Encryption",
        "Essence of Indian Traditional Knowledge"
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
  const [showLanding, setShowLanding] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [landingExiting, setLandingExiting] = useState(false);
  const goToBrowse = () => {
  setLandingExiting(true);

  setTimeout(() => {
    setShowLanding(false);

    setTimeout(() => {
      document.getElementById("browse")?.scrollIntoView({
        behavior: "smooth",
      });

      setLandingExiting(false);
    }, 100);
  }, 300);
};
  const [adminUser, setAdminUser] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggingIn, setAdminLoggingIn] = useState(false);
  const [uploadCollege, setUploadCollege] = useState("");
  const [uploadCourse, setUploadCourse] = useState("");
  const [uploadBranch, setUploadBranch] = useState("");
  const [branchMode, setBranchMode] = useState("single");
  const [selectedBranches, setSelectedBranches] = useState([]);
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
      .select(`
        *,
        paper_branches (
          branch
        )
      `);

    if (error) {
      console.error("Error fetching papers:", error);
      return;
    }

    console.log("Papers from Supabase:", data);

    setPaperData(data || []);
  };

  fetchPapers();
}, []);
useEffect(() => {
  const checkAdminSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setAdminUser(session?.user ?? null);
  };

  checkAdminSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setAdminUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
const handleAdminLogin = async (e) => {
  e.preventDefault();

  setAdminLoggingIn(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (error) {
    console.error("Admin login error:", error);
    alert("Invalid admin email or password.");
    setAdminLoggingIn(false);
    return;
  }

  setAdminUser(data.user);
  setAdminEmail("");
  setAdminPassword("");
  setShowAdminLogin(false);
  setShowAdmin(true);
  setAdminLoggingIn(false);

  await fetchPendingPapers();
  await fetchRejectedPapers();
  };
const handleAdminLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Admin logout error:", error);
    alert("Logout failed.");
    return;
  }

  setAdminUser(null);
  setShowAdmin(false);
  setPendingPapers([]);
  setRejectedPapers([]);

  alert("Admin logged out successfully! 👋");
};
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
    (branchMode === "single" && !uploadBranch) ||
    (branchMode === "selected" && selectedBranches.length === 0) ||
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

  const maxSize = 10 * 1024 * 1024;

  if (uploadFile.size > maxSize) {
    alert("PDF size must be less than 10 MB.");
    return;
  }

  try {
    setUploading(true);

    // Branches that this paper will belong to
    const branchesToSave =
      branchMode === "all"
        ? Object.keys(collegeData[uploadCollege][uploadCourse])
        : branchMode === "selected"
        ? selectedBranches
        : [uploadBranch];

    // Check existing papers
    const { data: existingPapers, error: duplicateError } = await supabase
      .from("papers")
      .select(`
        id,
        status,
        branch,
        paper_branches (
          branch
        )
      `)
      .eq("college", uploadCollege)
      .eq("course", uploadCourse)
      .eq("semester", uploadSemester)
      .eq("subject", uploadSubject)
      .eq("year", Number(uploadYear))
      .eq("exam_type", uploadExamType);

    if (duplicateError) {
      throw duplicateError;
    }

    // Check if any selected branch already has this paper
    const duplicatePaper = existingPapers?.find((paper) => {
      let existingBranches = [];

      // New papers: branches stored in paper_branches
      if (paper.paper_branches?.length > 0) {
        existingBranches = paper.paper_branches.map(
          (item) => item.branch
        );
      }

      // Old papers: branch stored directly in papers table
      else if (paper.branch && paper.branch !== "MULTIPLE") {
        existingBranches = [paper.branch];
      }

      return branchesToSave.some((branch) =>
        existingBranches.includes(branch)
      );
    });

    if (duplicatePaper) {
      alert(
        "This paper already exists for one or more selected branches."
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

    // Insert paper
    const { data: insertedPaper, error: dbError } = await supabase
      .from("papers")
      .insert([
        {
          college: uploadCollege,
          course: uploadCourse,
          branch: "MULTIPLE",
          semester: uploadSemester,
          subject: uploadSubject,
          year: Number(uploadYear),
          exam_type: uploadExamType,
          pdf_url: pdfUrl,
        },
      ])
      .select()
      .single();

    if (dbError) {
      await supabase.storage
        .from("papers")
        .remove([fileName]);

      throw dbError;
    }

    // Create branch mappings
    const branchMappings = branchesToSave.map((branch) => ({
      paper_id: insertedPaper.id,
      branch: branch,
    }));

    const { error: branchError } = await supabase
      .from("paper_branches")
      .insert(branchMappings);

    if (branchError) {
      console.error("Branch mapping error:", branchError);

      await supabase.storage
        .from("papers")
        .remove([fileName]);

      throw branchError;
    }

    alert(
      "Paper uploaded successfully! 🎉\n\nYour paper is now pending admin approval."
    );

    // Refresh papers with branch mappings
    const { data: refreshedPapers, error: refreshError } =
      await supabase
        .from("papers")
        .select(`
          *,
          paper_branches (
            branch
          )
        `);

    if (refreshError) {
      console.error("Refresh error:", refreshError);
    }

    setPaperData(refreshedPapers || []);

    // Reset upload form
    setUploadCollege("");
    setUploadCourse("");
    setUploadBranch("");
    setUploadSemester("");
    setUploadSubject("");
    setBranchMode("single");
    setSelectedBranches([]);
    setUploadYear("");
    setUploadExamType("");
    setUploadFile(null);

    // Close upload form
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

  if (!confirmed) return;

  console.log("Reject clicked, ID:", paperId);

  // 1. Get paper details
  const { data: paper, error: fetchError } = await supabase
    .from("papers")
    .select("id, pdf_url")
    .eq("id", paperId)
    .single();

  if (fetchError) {
    console.error("Fetch paper error:", fetchError);
    alert("Could not find paper: " + fetchError.message);
    return;
  }

  console.log("Paper found:", paper);

  // 2. Get file path from PDF URL
  const pdfUrl = paper.pdf_url;
  const marker = "/storage/v1/object/public/papers/";

  if (!pdfUrl || !pdfUrl.includes(marker)) {
    console.error("Invalid PDF URL:", pdfUrl);
    alert("Invalid paper PDF URL.");
    return;
  }

  const filePath = decodeURIComponent(
    pdfUrl.split(marker)[1]
  );

  console.log("Deleting Storage file:", filePath);

  // 3. Delete PDF from Storage
  const { data: storageData, error: storageError } =
    await supabase.storage
      .from("papers")
      .remove([filePath]);

  console.log("Storage delete result:", storageData);
  console.log("Storage delete error:", storageError);

  if (storageError) {
    alert("Could not delete PDF: " + storageError.message);
    return;
  }

  // 4. Delete database row
  const { data: deletedRows, error: deleteError } = await supabase
    .from("papers")
    .delete()
    .eq("id", paperId)
    .select("id");

  console.log("Deleted database rows:", deletedRows);
  console.log("Database delete error:", deleteError);

  if (deleteError) {
    console.error("Database delete error:", deleteError);

    alert(
      "Database record delete failed:\n" +
      deleteError.message
    );

    return;
  }

  // IMPORTANT: DELETE succeeded technically,
  // but check whether any row was actually deleted.
  if (!deletedRows || deletedRows.length === 0) {
    console.error(
      "NO ROW WAS DELETED. Possible RLS DELETE policy issue.",
      paperId
    );

    alert(
      "Paper could not be deleted from database.\n\n" +
      "Most likely Supabase RLS DELETE policy is blocking it."
    );

    return;
  }

  console.log("Successfully deleted:", deletedRows);

  // 5. Remove from UI immediately
  setPendingPapers((prev) =>
    prev.filter((paper) => paper.id !== paperId)
  );

  setRejectedPapers((prev) =>
    prev.filter((paper) => paper.id !== paperId)
  );

  setPaperData((prev) =>
    prev.filter((paper) => paper.id !== paperId)
  );

  // 6. Refresh from Supabase
  await refreshAdminPapers();

  alert("Paper rejected and completely removed ❌");
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

  const branchMatches =
    paper.branch?.trim() === branch.trim() ||
    (
      paper.branch?.trim() === "MULTIPLE" &&
      paper.paper_branches?.some(
        (item) => item.branch?.trim() === branch.trim()
      )
    );

  const matchesFilters =
    paper.status === "approved" &&
    paper.college?.trim() === college.trim() &&
    paper.course?.trim() === course.trim() &&
    branchMatches &&
    paper.semester?.trim() === semester.trim() &&
    paper.subject?.trim() === subject.trim();

  const matchesSearch =
    paper.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.exam_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(paper.year).includes(searchQuery);

  return matchesFilters && matchesSearch;
});
if (activePage === "about") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="logo-image"
          />
        </div>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("home");

              setTimeout(() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Browse Papers
          </button>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-container">

          <span className="legal-badge">ABOUT PAPERVAULT</span>

          <h1>About Us</h1>

          <p className="legal-intro">
            PaperVault is a student-focused platform designed to make
            previous-year question papers easier to find, organize and
            access.
          </p>

          <section>
            <h2>Our Mission</h2>
            <p>
              Our mission is to help students prepare better by bringing
              question papers together in one simple and organized platform.
              Instead of searching through different sources, students can
              browse papers according to their college, course, branch,
              semester and subject.
            </p>
          </section>

          <section>
            <h2>What We Provide</h2>
            <p>
              PaperVault allows students to discover and download available
              previous-year question papers. Students can also contribute
              useful papers to help other learners.
            </p>
          </section>

          <section>
            <h2>Built for Students</h2>
            <p>
              PaperVault is built with students in mind. We aim to keep the
              platform simple, organized and useful for exam preparation.
              Uploaded papers are reviewed before they become publicly
              available on the platform.
            </p>
          </section>

          <section>
            <h2>Our Vision</h2>
            <p>
              We want to build a reliable academic resource where students
              from different colleges can easily access useful previous-year
              papers and prepare with greater confidence.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              Have a question, suggestion or concern about PaperVault?
              You can reach us at{" "}
              <a href="mailto:papervault34@gmail.com">
                papervault34@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>Previous papers. Better preparation.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => setActivePage("home")}>
              Home
            </button>

            <button
              onClick={() => {
                setActivePage("home");

                setTimeout(() => {
                  document.getElementById("browse")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Browse Papers
            </button>

            <button onClick={() => setShowUpload(true)}>
              Upload Paper
            </button>

            <button onClick={() => setActivePage("about")}>
              About Us
            </button>

            <a href="mailto:papervault34@gmail.com">
              Contact
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
if (activePage === "contact") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="logo-image"
          />
        </div>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("home");

              setTimeout(() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Browse Papers
          </button>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-container">

          <span className="legal-badge">CONTACT PAPERVAULT</span>

          <h1>Contact Us</h1>

          <p className="legal-intro">
            Have a question, suggestion, feedback or concern?
            We would love to hear from you.
          </p>

          <section>
            <h2>Get in Touch</h2>
            <p>
              For general questions, suggestions or feedback about
              PaperVault, you can contact us through email.
            </p>

            <p>
              <a href="mailto:papervault34@gmail.com">
                papervault34@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2>Paper Related Concerns</h2>
            <p>
              If you believe a question paper uploaded on PaperVault
              should be removed or you have a copyright-related concern,
              please contact us with the relevant details.
            </p>
          </section>

          <section>
            <h2>Suggestions & Feedback</h2>
            <p>
              Your feedback helps us improve PaperVault and make it more
              useful for students. Feel free to share suggestions about
              features, colleges, subjects or the overall experience.
            </p>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>Previous papers. Better preparation.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => setActivePage("home")}>
              Home
            </button>

            <button
              onClick={() => {
                setActivePage("home");

                setTimeout(() => {
                  document.getElementById("browse")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Browse Papers
            </button>

            <button onClick={() => setShowUpload(true)}>
              Upload Paper
            </button>

            <button onClick={() => setActivePage("about")}>
              About Us
            </button>

            <button onClick={() => setActivePage("contact")}>
              Contact
            </button>
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
if (activePage === "privacy") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="logo-image"
          />
        </div>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("home");

              setTimeout(() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Browse Papers
          </button>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-container">

          <span className="legal-badge">PAPERVAULT PRIVACY</span>

          <h1>Privacy Policy</h1>

          <p className="legal-intro">
            Your privacy matters to us. This Privacy Policy explains how
            PaperVault handles information when you use our website.
          </p>

          <section>
            <h2>Information We Collect</h2>
            <p>
              PaperVault may collect information that you voluntarily provide
              when using features such as uploading academic papers or
              contacting us.
            </p>
          </section>

          <section>
            <h2>Uploaded Papers</h2>
            <p>
              When you upload a question paper, the information associated
              with the submission may be stored on our platform so that the
              paper can be reviewed and, if approved, made available to
              other students.
            </p>
          </section>

          <section>
            <h2>How We Use Information</h2>
            <p>
              Information collected through PaperVault may be used to operate,
              maintain and improve the website, review uploaded content,
              respond to users and maintain platform security.
            </p>
          </section>

          <section>
            <h2>Cookies and Similar Technologies</h2>
            <p>
              PaperVault may use cookies or similar technologies in the future
              to improve website functionality, understand usage and support
              services such as analytics or advertising.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              PaperVault may use third-party services for hosting, database
              management, storage, analytics or other website functionality.
              These services may process information according to their own
              privacy policies.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect information handled by
              PaperVault. However, no online service can guarantee complete
              security of information.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:papervault34@gmail.com">
                papervault34@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>Previous papers. Better preparation.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => setActivePage("home")}>
              Home
            </button>

            <button
              onClick={() => {
                setActivePage("home");

                setTimeout(() => {
                  document.getElementById("browse")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Browse Papers
            </button>

            <button onClick={() => setShowUpload(true)}>
              Upload Paper
            </button>

            <button onClick={() => setActivePage("about")}>
              About Us
            </button>

            <button onClick={() => setActivePage("contact")}>
              Contact
            </button>

            <button onClick={() => setActivePage("privacy")}>
              Privacy Policy
            </button>
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
if (activePage === "terms") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="logo-image"
          />
        </div>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("home");

              setTimeout(() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Browse Papers
          </button>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-container">

          <span className="legal-badge">PAPERVAULT TERMS</span>

          <h1>Terms & Conditions</h1>

          <p className="legal-intro">
            By using PaperVault, you agree to follow these Terms &
            Conditions. Please read them carefully before using the website.
          </p>

          <section>
            <h2>Use of the Website</h2>
            <p>
              PaperVault is provided as an educational resource for students.
              You agree to use the website only for lawful purposes and in a
              responsible manner.
            </p>
          </section>

          <section>
            <h2>Uploaded Content</h2>
            <p>
              Users may upload academic question papers and related
              educational material. By uploading content, you confirm that
              you have the right or permission to share the material.
            </p>
          </section>

          <section>
            <h2>Content Review</h2>
            <p>
              Uploaded papers may be reviewed by PaperVault administrators
              before being made publicly available. We reserve the right to
              approve, reject or remove uploaded content.
            </p>
          </section>

          <section>
            <h2>Copyright</h2>
            <p>
              PaperVault respects intellectual property rights. If you believe
              that any content available on the website infringes your rights,
              please contact us with the relevant details so the matter can be
              reviewed.
            </p>
          </section>

          <section>
            <h2>Accuracy of Information</h2>
            <p>
              PaperVault aims to provide useful academic resources, but we do
              not guarantee that every paper, description or other information
              available on the website is complete, accurate or error-free.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              PaperVault may use third-party services for hosting, storage,
              database management, analytics or other functionality. Their use
              may be subject to separate terms and policies.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              PaperVault is provided on an "as available" basis. We are not
              responsible for any loss or damage resulting from the use of
              information or resources available through the website.
            </p>
          </section>

          <section>
            <h2>Changes to These Terms</h2>
            <p>
              We may update these Terms & Conditions from time to time.
              Continued use of PaperVault after changes are published means
              that you accept the updated terms.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions regarding these Terms & Conditions,
              contact us at{" "}
              <a href="mailto:papervault34@gmail.com">
                papervault34@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>Previous papers. Better preparation.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => setActivePage("home")}>
              Home
            </button>

            <button
              onClick={() => {
                setActivePage("home");

                setTimeout(() => {
                  document.getElementById("browse")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Browse Papers
            </button>

            <button onClick={() => setShowUpload(true)}>
              Upload Paper
            </button>

            <button onClick={() => setActivePage("about")}>
              About Us
            </button>

            <button onClick={() => setActivePage("contact")}>
              Contact
            </button>

            <button onClick={() => setActivePage("privacy")}>
              Privacy Policy
            </button>

            <button onClick={() => setActivePage("terms")}>
              Terms & Conditions
            </button>
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
if (activePage === "disclaimer") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="logo-image"
          />
        </div>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("home");

              setTimeout(() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Browse Papers
          </button>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-container">

          <span className="legal-badge">PAPERVAULT DISCLAIMER</span>

          <h1>Disclaimer</h1>

          <p className="legal-intro">
            The information and academic resources available on PaperVault
            are provided for educational and informational purposes only.
          </p>

          <section>
            <h2>Educational Purpose</h2>
            <p>
              PaperVault is created to help students access previous-year
              question papers and use them as a study resource. The papers
              available on the platform should not be considered an official
              representation of any college, university or examination body.
            </p>
          </section>

          <section>
            <h2>User-Uploaded Content</h2>
            <p>
              Some question papers may be uploaded by students or other
              users. PaperVault does not claim ownership of user-uploaded
              content unless explicitly stated.
            </p>
          </section>

          <section>
            <h2>Accuracy of Content</h2>
            <p>
              We try to keep the information on PaperVault accurate and
              useful. However, we cannot guarantee that every uploaded paper,
              subject name, year, examination type or other information is
              completely accurate or error-free.
            </p>
          </section>

          <section>
            <h2>Official Affiliation</h2>
            <p>
              Unless explicitly stated, PaperVault is not affiliated with,
              endorsed by or officially connected to any college, university,
              examination authority or educational institution whose materials
              may appear on the platform.
            </p>
          </section>

          <section>
            <h2>Copyright Concerns</h2>
            <p>
              If you believe that any content available on PaperVault
              infringes your copyright or other rights, please contact us.
              We will review legitimate concerns and take appropriate action.
            </p>
          </section>

          <section>
            <h2>External Services</h2>
            <p>
              PaperVault may use third-party services for hosting, storage,
              database management, analytics or other functionality. We are
              not responsible for the policies or practices of third-party
              services.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              For questions, concerns or copyright-related requests, contact
              us at{" "}
              <a href="mailto:papervault34@gmail.com">
                papervault34@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>Previous papers. Better preparation.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => setActivePage("home")}>
              Home
            </button>

            <button
              onClick={() => {
                setActivePage("home");

                setTimeout(() => {
                  document.getElementById("browse")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Browse Papers
            </button>

            <button onClick={() => setShowUpload(true)}>
              Upload Paper
            </button>

            <button onClick={() => setActivePage("about")}>
              About Us
            </button>

            <button onClick={() => setActivePage("contact")}>
              Contact
            </button>

            <button onClick={() => setActivePage("privacy")}>
              Privacy Policy
            </button>

            <button onClick={() => setActivePage("terms")}>
              Terms & Conditions
            </button>

            <button onClick={() => setActivePage("disclaimer")}>
              Disclaimer
            </button>
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
if (activePage === "copyright") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="logo-image"
          />
        </div>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              setActivePage("home");

              setTimeout(() => {
                document.getElementById("browse")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Browse Papers
          </button>
        </div>
      </nav>

      <main className="legal-page">
        <div className="legal-container">

          <span className="legal-badge">COPYRIGHT & TAKEDOWN</span>

          <h1>Copyright & Takedown Policy</h1>

          <p className="legal-intro">
            PaperVault respects intellectual property rights and provides a
            process for reporting content that may infringe copyright.
          </p>

          <section>
            <h2>Respect for Copyright</h2>
            <p>
              PaperVault respects the intellectual property rights of authors,
              institutions and copyright holders. We do not intend to
              knowingly host content that infringes the rights of others.
            </p>
          </section>

          <section>
            <h2>User-Uploaded Content</h2>
            <p>
              Some academic papers available on PaperVault may be submitted
              by students or other users. Users are responsible for ensuring
              that they have the necessary rights or permission to upload
              material.
            </p>
          </section>

          <section>
            <h2>How to Report Content</h2>
            <p>
              If you believe that a paper or other content on PaperVault
              infringes your copyright or other rights, please contact us
              with enough information for us to identify and review the
              reported content.
            </p>
          </section>

          <section>
            <h2>Information to Include</h2>
            <p>
              When submitting a takedown request, please include the relevant
              paper or page, a description of the content in question, your
              reason for the request and your contact information.
            </p>
          </section>

          <section>
            <h2>Review and Removal</h2>
            <p>
              We may review reported content and take appropriate action,
              which may include removing or restricting access to the
              reported material.
            </p>
          </section>

          <section>
            <h2>False or Misleading Reports</h2>
            <p>
              Please submit copyright or takedown requests only when you have
              a genuine concern. Providing false or misleading information
              may delay the review process.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Copyright and takedown requests can be sent to{" "}
              <a href="mailto:papervault34@gmail.com">
                papervault34@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <img
              src="/papervault-logo.png"
              alt="PaperVault"
              className="footer-logo"
            />

            <p>Previous papers. Better preparation.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => setActivePage("home")}>
              Home
            </button>

            <button
              onClick={() => {
                setActivePage("home");

                setTimeout(() => {
                  document.getElementById("browse")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
            >
              Browse Papers
            </button>

            <button onClick={() => setShowUpload(true)}>
              Upload Paper
            </button>

            <button onClick={() => setActivePage("about")}>
              About Us
            </button>

            <button onClick={() => setActivePage("contact")}>
              Contact
            </button>

            <button onClick={() => setActivePage("privacy")}>
              Privacy Policy
            </button>

            <button onClick={() => setActivePage("terms")}>
              Terms & Conditions
            </button>

            <button onClick={() => setActivePage("disclaimer")}>
              Disclaimer
            </button>

            <button onClick={() => setActivePage("copyright")}>
              Copyright / Takedown
            </button>
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
if (showLanding) {
  return (
    <div className={`app landing-page ${landingExiting ? "landing-exiting" : ""}`}>
      {/* Landing Navbar */}
      <nav className="landing-navbar">

        <div className="landing-logo">
          <img
            src="/papervault-logo.png"
            alt="PaperVault"
            className="landing-logo-image"
          />
        </div>

        <div className="landing-nav-links">
          <button
  onClick={() => {
    document.getElementById("landing-home")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Home
</button>

          <button
  onClick={() => {
    setShowLanding(false);

    setTimeout(() => {
      document.getElementById("browse")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
>
  Browse Papers
</button>

          <button
            onClick={() => {
              setShowLanding(false);
              setShowUpload(true);
            }}
            className="landing-upload-nav"
          >
            Upload
          </button>

          <button
  onClick={() => {
    setShowLanding(false);

    setTimeout(() => {
      document.getElementById("browse")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
  className="landing-get-started"
>
  Get Started →
</button>
        </div>

      </nav>


      {/* Hero */}
      <section className="landing-hero" id="landing-home">

        {/* Floating decorative elements */}
        <div className="floating-paper floating-paper-one">📄</div>
        <div className="floating-paper floating-paper-two">📚</div>
        <div className="floating-star">✦</div>
        <div className="floating-dot floating-dot-one"></div>
        <div className="floating-dot floating-dot-two"></div>

        <div className="landing-hero-content">

          <div className="landing-badge">
            🎓 Built for Students
          </div>

          <h1>
            Previous Papers.
            <br />
            <span>Better Preparation.</span>
          </h1>

          <p>
            Find, share and organize previous-year question papers
            from your college. Study smarter, not harder.
          </p>

          <div className="landing-actions">

            <button
              className="landing-primary-btn"
              onClick={() => setShowLanding(false)}
            >
              Browse Papers
              <span>→</span>
            </button>

            <button
              className="landing-secondary-btn"
              onClick={() => {
                setShowLanding(false);
                setShowUpload(true);
              }}
            >
              Upload a Paper
            </button>

          </div>

        </div>


        {/* Hero visual */}
        {/* Hero visual */}
<div className="landing-visual paper-hero">

  <div className="hero-paper hero-paper-back"></div>

  <div className="hero-paper hero-paper-middle"></div>

  <div className="hero-paper hero-paper-front">

    <div className="question-paper-label">
      QUESTION
      <br />
      PAPER
    </div>

    <div className="question-paper-lines">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div className="question-paper-circle">
      PV
    </div>

  </div>

</div>

      </section>


      {/* Why PaperVault */}
      <section className="why-section">

        <div className="section-heading">
          <span>WHY PAPERVAULT?</span>
          <h2>Everything you need to prepare better.</h2>
          <p>
            One simple platform to find and share question papers.
          </p>
        </div>

        <div className="feature-grid">

          <div
  className="feature-card feature-clickable"
  onClick={() => {
    setShowLanding(false);

    setTimeout(() => {
      document.getElementById("browse")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
>
  <div className="feature-icon">🔎</div>
  <h3>Find Papers</h3>
  <p>
    Quickly discover papers according to your college, branch, semester and subject.
  </p>
  <span className="feature-link">Explore Papers →</span>
</div>

          <div
  className="feature-card feature-clickable"
  onClick={() => {
    setShowLanding(false);
    setShowUpload(true);
  }}
>
  <div className="feature-icon">📤</div>
  <h3>Upload Papers</h3>
  <p>
    Share useful question papers and help other students prepare for their exams.
  </p>
  <span className="feature-link">Upload a Paper →</span>
</div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Stay Organized</h3>
            <p>
              Keep previous-year papers structured by college,
              semester and subject.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Prepare Better</h3>
            <p>
              Practice with previous papers and understand what
              to expect before your exams.
            </p>
          </div>

        </div>

      </section>


      {/* How it works */}
      <section className="how-section">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Find your paper in four simple steps.</h2>
        </div>

        <div className="steps-grid">

  <div
    className="step-card step-clickable"
    onClick={() => {
      setShowLanding(false);
      setTimeout(() => {
        document.getElementById("browse")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }}
  >
    <div className="step-number">01</div>
    <div className="step-icon">🏫</div>
    <h3>Select College</h3>
    <p>Choose your college.</p>
  </div>

  <div
    className="step-card step-clickable"
    onClick={() => {
      setShowLanding(false);
      setTimeout(() => {
        document.getElementById("browse")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }}
  >
    <div className="step-number">02</div>
    <div className="step-icon">💻</div>
    <h3>Choose Branch</h3>
    <p>Select your course and branch.</p>
  </div>

  <div
    className="step-card step-clickable"
    onClick={() => {
      setShowLanding(false);
      setTimeout(() => {
        document.getElementById("browse")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }}
  >
    <div className="step-number">03</div>
    <div className="step-icon">📖</div>
    <h3>Select Semester</h3>
    <p>Pick your semester and subject.</p>
  </div>

  <div
    className="step-card step-clickable"
    onClick={() => {
      setShowLanding(false);
      setTimeout(() => {
        document.getElementById("browse")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }}
  >
    <div className="step-number">04</div>
    <div className="step-icon">📄</div>
    <h3>Get Papers</h3>
    <p>View and download papers.</p>
  </div>

</div>
      </section>


      {/* CTA */}
      <section className="landing-cta">

        <div className="cta-floating-circle"></div>

        <div>
          <span>READY TO PREPARE?</span>

          <h2>
            Your next exam starts
            <br />
            with the right paper.
          </h2>

          <p>
            Explore previous-year question papers and prepare
            with confidence.
          </p>
        </div>

        <button
          onClick={() => setShowLanding(false)}
          className="cta-button"
        >
          Browse Papers →
        </button>

      </section>


      {/* Landing Footer */}
      <footer className="landing-footer">

        <div className="landing-footer-brand">

          <img
            src="/papervault-logo.png"
            alt="PaperVault"
          />

          <p>
            Previous papers. Better preparation.
          </p>

        </div>

        <div className="landing-footer-links">
  <button onClick={() => setShowLanding(false)}>
    Browse Papers
  </button>

  <button
    onClick={() => {
      setShowLanding(false);
      setShowUpload(true);
    }}
  >
    Upload Paper
  </button>
</div>

<div className="landing-footer-contact">
  <span>CONTACT</span>

  <a href="mailto:papervault34@gmail.com">
    ✉ papervault34@gmail.com
  </a>

  <a
    href="https://www.instagram.com/papervault34"
    target="_blank"
    rel="noopener noreferrer"
  >
    ◎ @papervault34
  </a>
</div>

        <div className="landing-footer-bottom">
          © {new Date().getFullYear()} PaperVault • Built for Students 🎓
        </div>

      </footer>

    </div>
  );
}
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
    if (adminUser) {
      setShowAdmin(true);
      fetchPendingPapers();
      fetchRejectedPapers();
    } else {
      setShowAdminLogin(true);
    }
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
{showAdminLogin && (
  <div className="upload-overlay">
    <div className="upload-box">

      <button
        className="close-button"
        onClick={() => {
          setShowAdminLogin(false);
          setAdminEmail("");
          setAdminPassword("");
        }}
      >
        ✕
      </button>

      <h2>👑 Admin Login</h2>

      <p>
        Login to access the PaperVault admin panel.
      </p>

      <form
        className="upload-form"
        onSubmit={handleAdminLogin}
      >
        <input
          type="email"
          placeholder="Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={adminLoggingIn}
        >
          {adminLoggingIn ? "Logging in..." : "Login as Admin"}
        </button>
      </form>

    </div>
  </div>
)}
{/* Admin Panel */}
  {showAdmin && adminUser && (
    <div className="admin-panel">

      <div className="admin-header">

        <div>
          <h2>👑 Admin Panel</h2>
          <button
  className="admin-logout-button"
  onClick={handleAdminLogout}
>
  Logout
</button>
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
  value={branchMode}
  onChange={(e) => {
    setBranchMode(e.target.value);
    setUploadBranch("");
    setSelectedBranches([]);
    setUploadSemester("");
    setUploadSubject("");
  }}
  disabled={!uploadCourse}
>
  <option value="single">Single Branch</option>
  <option value="selected">Selected Branches</option>
  <option value="all">All Branches</option>
</select>

{branchMode === "single" && (
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
)}

{branchMode === "selected" && (
  <div className="branch-checkboxes">
    <p>Select Branches:</p>

    {uploadCollege &&
      uploadCourse &&
      Object.keys(collegeData[uploadCollege][uploadCourse]).map(
        (branchName) => (
          <label key={branchName}>
            <input
              type="checkbox"
              value={branchName}
              checked={selectedBranches.includes(branchName)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBranches([
                    ...selectedBranches,
                    branchName,
                  ]);
                } else {
                  setSelectedBranches(
                    selectedBranches.filter(
                      (branch) => branch !== branchName
                    )
                  );
                }
                setUploadSemester("");
                setUploadSubject("");
              }}
            />
            {branchName}
          </label>
        )
      )}
  </div>
)}

{branchMode === "all" && (
  <div className="all-branches-message">
    ✅ This paper will be available for all branches.
  </div>
)}

      <select
  value={uploadSemester}
  onChange={(e) => {
    setUploadSemester(e.target.value);
    setUploadSubject("");
  }}
  disabled={
    !uploadCourse ||
    (branchMode === "single" && !uploadBranch) ||
    (branchMode === "selected" && selectedBranches.length === 0)
  }
>
  <option value="">Select Semester</option>

  {uploadCollege &&
    uploadCourse &&
    (() => {
      const branches =
        branchMode === "all"
          ? Object.keys(collegeData[uploadCollege][uploadCourse])
          : branchMode === "selected"
          ? selectedBranches
          : uploadBranch
          ? [uploadBranch]
          : [];

      if (branches.length === 0) return null;

      const firstBranch =
        collegeData[uploadCollege][uploadCourse][branches[0]];

      return Object.keys(firstBranch).map((semesterName) => (
        <option key={semesterName} value={semesterName}>
          {semesterName}
        </option>
      ));
    })()}
</select>

      <select
  value={uploadSubject}
  onChange={(e) => setUploadSubject(e.target.value)}
  disabled={!uploadSemester}
>
  <option value="">Select Subject</option>

  {uploadCollege &&
    uploadCourse &&
    uploadSemester &&
    (() => {
      const branches =
        branchMode === "all"
          ? Object.keys(collegeData[uploadCollege][uploadCourse])
          : branchMode === "selected"
          ? selectedBranches
          : uploadBranch
          ? [uploadBranch]
          : [];

      if (branches.length === 0) return null;

      const subjectLists = branches.map(
        (branch) =>
          collegeData[uploadCollege][uploadCourse][branch][
            uploadSemester
          ] || []
      );

      // Only subjects common to all selected branches
      const commonSubjects = subjectLists[0].filter((subject) =>
        subjectLists.every((list) => list.includes(subject))
      );

      return commonSubjects.map((subjectName) => (
        <option key={subjectName} value={subjectName}>
          {subjectName}
        </option>
      ));
    })()}
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

  <button onClick={() => setActivePage("about")}>
    About Us
  </button>

  <button onClick={() => setActivePage("contact")}>
  Contact
</button>
<button onClick={() => setActivePage("privacy")}>
  Privacy Policy
</button>
<button onClick={() => setActivePage("terms")}>
  Terms & Conditions
</button>
<button onClick={() => setActivePage("disclaimer")}>
  Disclaimer
</button>
<button onClick={() => setActivePage("copyright")}>
  Copyright / Takedown
</button>
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