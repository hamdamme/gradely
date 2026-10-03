import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/UI";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import { SubmitPage } from "./pages/SubmitPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ProgressPage } from "./pages/ProgressPage";

// A route-param change must discard the previous assignment's selected file/timer.
function AssignmentSubmission() {
  const { id } = useParams();
  return <SubmitPage key={id} />;
}
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/assignments" replace />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="submit/:id" element={<AssignmentSubmission />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
