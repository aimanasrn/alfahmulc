export const staffForms = [
  {
    id: "punch-card",
    googleFormId: "1FAIpQLSeW60omQm02t1SsvuRvWny5X228R0FrL8aIEbStj5CmD-_JWQ",
    title: "Tidak Start Sesi/Punch Card",
    description: "Laporkan sesi atau punch card yang tidak dimulakan.",
    category: "Rekod sesi",
    openExternally: false,
  },
  {
    id: "penangguhan",
    googleFormId: "1FAIpQLSelRYSVw2z2r7Ut6_MdI3r0Leee56W_3doXt_5-bLs2E3MiJQ",
    title: "Penangguhan dan Pembatalan Kelas",
    description: "Maklumkan penangguhan atau pembatalan kelas kepada pihak pengurusan.",
    category: "Jadual kelas",
    openExternally: false,
  },
  {
    id: "pertukaran",
    googleFormId: "1FAIpQLScEABTb0bUXpi9PfPqRUyJPzcqvSRUA6kVxVUM3dP6GpgEhRw",
    title: "Pertukaran kelas online ke fizikal dan sebaliknya",
    description: "Mohon pertukaran mod kelas antara online dan fizikal.",
    category: "Mod kelas",
    openExternally: false,
  },
  {
    id: "pendaftaran-tutor",
    googleFormId: "1FAIpQLScyabSEyeydZMfmatVbmUdUbvo2b4kipuonpy70x8CY5BkHng",
    title: "Pendaftaran Tutor 2027",
    description: "Lengkapkan maklumat pendaftaran tutor bagi tahun 2027.",
    category: "Pendaftaran",
    // Google currently returns HTTP 401 for this form's embedded URL.
    openExternally: true,
  },
] as const;

export function getGoogleFormUrl(googleFormId: string, embedded = false) {
  const url = `https://docs.google.com/forms/d/e/${googleFormId}/viewform`;
  return embedded ? `${url}?embedded=true` : url;
}
