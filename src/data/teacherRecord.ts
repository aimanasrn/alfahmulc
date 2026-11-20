export type Student = { nama: string; darjah: string };

// Darjah setiap pelajar diambil daripada tab Pelajar dalam Google Sheet.
export function findStudent(students: Student[], name: string) {
  const key = name.replace(/\s+/g, " ").trim().toUpperCase();
  return key ? students.find((student) => student.nama === key) : undefined;
}

// Dashboard dikumpulkan ikut ejaan ini, jadi subjek dipilih daripada senarai.
export const recordSubjects = [
  "Bacaan Al-Quran",
  "Iqra",
  "KAFA",
  "Belajar Membaca",
  "Bahasa Melayu",
  "Bahasa Inggeris",
  "Matematik",
  "Sains",
] as const;

const months = [
  "JANUARI",
  "FEBRUARI",
  "MAC",
  "APRIL",
  "MEI",
  "JUN",
  "JULAI",
  "OGOS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DISEMBER",
];

export function getRecentPeriods(now = new Date(), count = 6) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  });
}
