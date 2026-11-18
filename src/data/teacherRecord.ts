export const classLevels = [
  "Prasekolah",
  "Darjah 1",
  "Darjah 2",
  "Darjah 3",
  "Darjah 4",
  "Darjah 5",
  "Darjah 6",
  "Tingkatan 1",
  "Tingkatan 2",
  "Tingkatan 3",
  "Tingkatan 4",
  "Tingkatan 5",
] as const;

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
