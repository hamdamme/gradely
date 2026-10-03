export type AssignmentStatus = "In progress" | "Not started" | "Completed";
export interface Assignment {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: AssignmentStatus;
  due: string;
  attempts: number;
  maxAttempts: number;
}

// Deliberately separate fixture data from page components and future API code.
export const assignments: Assignment[] = [
  {
    id: 1,
    title: "Selenium Login Test",
    description:
      "Build a reliable login test suite. Cover successful sign-in, invalid credentials, and input validation.",
    tags: ["Selenium", "TestNG", "Maven"],
    status: "In progress",
    due: "Oct 8, 2026",
    attempts: 1,
    maxAttempts: 3,
  },
  {
    id: 2,
    title: "API Response Validation",
    description:
      "Verify the details that matter. Test response codes, JSON schemas, and error handling.",
    tags: ["REST Assured", "TestNG"],
    status: "Not started",
    due: "Oct 12, 2026",
    attempts: 0,
    maxAttempts: 3,
  },
  {
    id: 3,
    title: "Java Fundamentals",
    description:
      "Put your foundations into practice with collections, exception handling, and unit tests.",
    tags: ["Java 17", "TestNG"],
    status: "Completed",
    due: "Oct 2, 2026",
    attempts: 2,
    maxAttempts: 3,
  },
];
export const testCases = [
  "emptyCollectionReturnsZero",
  "singleItemCount",
  "multipleItemCount",
  "duplicateItemsHandled",
  "sortAscending",
  "sortDescending",
  "missingItemReturnsEmpty",
  "validInputAccepted",
  "exceptionsHaveMessage",
  "nullInputRejected",
].map((name, index) => ({
  name,
  passed: index < 9,
  durationMs: 12 + index * 3,
}));
export const scoreHistory = [
  { attempt: 1, score: 68 },
  { attempt: 2, score: 86 },
];
