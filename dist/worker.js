// src/shared/defaultData.ts
var DEFAULT_WEDDING_DATA = {
  groom: {
    role: "Ch\xFA R\u1EC3",
    name: "Nguy\u1EC5n Tu\u1EA5n Anh",
    shortName: "Tu\u1EA5n Anh",
    title: "K\u1EF9 S\u01B0 Ph\u1EA7n M\u1EC1m",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    parents: {
      father: "Nguy\u1EC5n V\u0103n H\xF9ng",
      mother: "L\xEA Th\u1ECB Thu Th\u1EA3o"
    },
    hometown: "H\xE0 N\u1ED9i",
    description: "M\u1ED9t ch\xE0ng trai h\u01B0\u1EDBng n\u1ED9i nh\u01B0ng lu\xF4n tr\xE0n ng\u1EADp s\u1EF1 ch\xE2n th\xE0nh v\xE0 ki\xEAn \u0111\u1ECBnh. Trong m\u1EAFt anh, t\xECm \u0111\u01B0\u1EE3c Mai Ph\u01B0\u01A1ng l\xE0 \u0111i\u1EC1u may m\u1EAFn nh\u1EA5t \u0111\u1EDDi m\xECnh.",
    bankInfo: {
      bankName: "Vietcombank (VCB)",
      accountNumber: "1018899889",
      accountHolder: "NGUYEN TUAN ANH",
      qrImage: "https://api.vietqr.io/image/970436-1018899889-print.jpg?accountName=NGUYEN%20TUAN%20ANH&amount=0"
    }
  },
  bride: {
    role: "C\xF4 D\xE2u",
    name: "Tr\u1EA7n Mai Ph\u01B0\u01A1ng",
    shortName: "Mai Ph\u01B0\u01A1ng",
    title: "Nh\xE0 Thi\u1EBFt K\u1EBF \u0110\u1ED3 H\u1ECDa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    parents: {
      father: "Tr\u1EA7n Minh \u0110\u1EE9c",
      mother: "Ph\u1EA1m Th\u1ECB B\xEDch Ng\u1ECDc"
    },
    hometown: "\u0110\xE0 N\u1EB5ng",
    description: "M\u1ED9t c\xF4 g\xE1i d\u1ECBu d\xE0ng, y\xEAu thi\xEAn nhi\xEAn v\xE0 c\xE1i \u0111\u1EB9p. N\u1EE5 c\u01B0\u1EDDi c\u1EE7a Ph\u01B0\u01A1ng l\xE0 ngu\u1ED3n n\u0103ng l\u01B0\u1EE3ng xua tan m\u1ECDi m\u1ECFi m\u1EC7t trong cu\u1ED9c s\u1ED1ng.",
    bankInfo: {
      bankName: "Techcombank (TCB)",
      accountNumber: "19036789012345",
      accountHolder: "TRAN MAI PHUONG",
      qrImage: "https://api.vietqr.io/image/970407-19036789012345-print.jpg?accountName=TRAN%20MAI%20PHUONG&amount=0"
    }
  },
  weddingDate: "2026-11-20T11:00:00+07:00",
  weddingDateFormatted: "Ch\u1EE7 Nh\u1EADt, 20 Th\xE1ng 11 N\u0103m 2026",
  events: [
    {
      id: "le-thanh-hon",
      title: "L\u1EC5 Th\xE0nh H\xF4n & Ti\u1EC7c C\u01B0\u1EDBi",
      date: "20/11/2026",
      time: "11:00 SA",
      dayOfWeek: "Ch\u1EE7 Nh\u1EADt",
      lunarDate: "Ng\xE0y 12 Th\xE1ng 10 N\u0103m B\xEDnh Ng\u1ECD",
      venueName: "Trung T\xE2m H\u1ED9i Ngh\u1ECB & Ti\u1EC7c C\u01B0\u1EDBi Riverside Palace",
      hallName: "S\u1EA3nh Grand Ballroom (T\u1EA7ng 3)",
      address: "360D B\u1EBFn V\xE2n \u0110\u1ED3n, Ph\u01B0\u1EDDng 1, Qu\u1EADn 4, TP. H\u1ED3 Ch\xED Minh",
      googleMapsUrl: "https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+Quan+4+Ho+Chi+Minh"
    },
    {
      id: "le-vu-quy",
      title: "L\u1EC5 Vu Quy (T\u1EA1i T\u01B0 Gia Nh\xE0 G\xE1i)",
      date: "20/11/2026",
      time: "08:00 SA",
      dayOfWeek: "Ch\u1EE7 Nh\u1EADt",
      lunarDate: "Ng\xE0y 12 Th\xE1ng 10 N\u0103m B\xEDnh Ng\u1ECD",
      venueName: "T\u01B0 Gia Nh\xE0 G\xE1i",
      hallName: "T\u01B0 Gia \u1EA4m C\xFAng",
      address: "S\u1ED1 88 \u0110\u01B0\u1EDDng Nguy\u1EC5n Tr\xE3i, Ph\u01B0\u1EDDng 3, Qu\u1EADn 5, TP. H\u1ED3 Ch\xED Minh",
      googleMapsUrl: "https://maps.google.com/?q=88+Nguyen+Trai+Quan+5+Ho+Chi+Minh"
    }
  ],
  timeline: [
    {
      id: "milestone-1",
      year: "2020",
      dateStr: "15.10.2020",
      title: "L\u1EA7n \u0110\u1EA7u Ch\u1EA1m \xC1nh M\u1EAFt",
      subtitle: "Qu\xE1n c\xE0 ph\xEA nh\u1ECF g\xF3c ph\u1ED1 Phan Chu Trinh",
      story: "M\u1ED9t bu\u1ED5i chi\u1EC1u thu H\xE0 N\u1ED9i se l\u1EA1nh, gi\u1EEFa ti\u1EBFng nh\u1EA1c Tr\u1ECBnh \xEAm \xEAm v\xE0 h\u01B0\u01A1ng c\xE0 ph\xEA \u1EA5m, ch\xFAng m\xECnh t\xECnh c\u1EDD ng\u1ED3i chung chi\u1EBFc b\xE0n s\xE1t c\u1EEDa k\xEDnh v\xEC qu\xE1n \u0111\xF4ng kh\xE1ch. T\u1EEB nh\u1EEFng c\xE2u chuy\u1EC7n b\xE2ng qu\u01A1 v\u1EC1 cu\u1ED1n s\xE1ch \u0111ang \u0111\u1ECDc, hai tr\xE1i tim xa l\u1EA1 b\u1ED7ng t\xECm th\u1EA5y nh\u1EEFng nh\u1ECBp \u0111\u1EADp \u0111\u1ED3ng \u0111i\u1EC7u \u0111\u1EBFn di\u1EC7u k\u1EF3.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
      tag: "Kho\u1EA3nh Kh\u1EAFc B\u1EAFt \u0110\u1EA7u",
      location: "H\xE0 N\u1ED9i"
    },
    {
      id: "milestone-2",
      year: "2021",
      dateStr: "14.02.2021",
      title: "L\u1EDDi T\u1ECF T\xECnh D\u01B0\u1EDBi C\u01A1n M\u01B0a \u0110\u1EA7u M\xF9a",
      subtitle: "B\u1EDD h\u1ED3 T\xE2y l\u1ED9ng gi\xF3",
      story: 'Ng\xE0y Valentine \u0111\u1EA7u ti\xEAn b\xEAn nhau, chi\u1EBFc \xF4 nh\u1ECF kh\xF4ng che n\u1ED5i nh\u1EEFng h\u1EA1t m\u01B0a b\u1EE5i, nh\u01B0ng b\xE0n tay \u1EA5m c\u1EE7a anh \u0111\xE3 \u0111\u1EE7 che ch\u1EDF cho tr\xE1i tim em. "L\xE0m ng\u01B0\u1EDDi y\xEAu anh nh\xE9?" - c\xE2u h\u1ECFi ng\u1EADp ng\u1EEBng nh\u01B0ng ch\u1EE9a chan t\u1EA5t c\u1EA3 ch\xE2n th\xE0nh. V\xE0 c\xE1i g\u1EADt \u0111\u1EA7u c\u1EE7a em \u0111\xE3 b\u1EAFt \u0111\u1EA7u m\u1ED9t h\xE0nh tr\xECnh y\xEAu th\u01B0\u01A1ng r\u1EF1c r\u1EE1.',
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop",
      tag: "L\u1EDDi H\u1EB9n \u01AF\u1EDBc",
      location: "H\u1ED3 T\xE2y, H\xE0 N\u1ED9i"
    },
    {
      id: "milestone-3",
      year: "2023",
      dateStr: "28.08.2023",
      title: "H\xE0nh Tr\xECnh Ng\u1EAFm Ho\xE0ng H\xF4n Xa X\xF4i",
      subtitle: "Chuy\u1EBFn \u0111i kh\xE1m ph\xE1 Ph\xFA Qu\u1ED1c",
      story: "Ch\xFAng m\xECnh \u0111\xE3 c\xF9ng nhau \u0111i qua nh\u1EEFng b\u1EDD c\xE1t tr\u1EAFng, ng\u1EAFm ho\xE0ng h\xF4n \u0111\u1ECF r\u1EF1c bu\xF4ng xu\u1ED1ng bi\u1EC3n c\u1EA3. Qua t\u1EEBng chuy\u1EBFn \u0111i, t\u1EEBng l\u1EA7n th\u1EA5u hi\u1EC3u nh\u1EEFng m\u1ECFi m\u1EC7t hay b\u1EA5t \u0111\u1ED3ng nh\u1ECF nh\u1EB7t, ch\xFAng m\xECnh nh\u1EADn ra \u0111\u1ED1i ph\u01B0\u01A1ng ch\xEDnh l\xE0 n\u01A1i ch\u1ED1n b\xECnh y\xEAn nh\u1EA5t \u0111\u1EC3 tr\u1EDF v\u1EC1 sau m\u1ECDi gi\xF4ng gi\xF3 ngo\xE0i kia.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop",
      tag: "C\xF9ng Nhau Tr\u01B0\u1EDFng Th\xE0nh",
      location: "Ph\xFA Qu\u1ED1c"
    },
    {
      id: "milestone-4",
      year: "2025",
      dateStr: "24.12.2025",
      title: 'Kho\u1EA3nh Kh\u1EAFc "Em \u0110\u1ED3ng \xDD - Yes, I Do!"',
      subtitle: "\u0110\xEAm Gi\xE1ng Sinh nhi\u1EC7m m\xE0u",
      story: 'D\u01B0\u1EDBi \xE1nh \u0111\xE8n lung linh c\u1EE7a c\xE2y th\xF4ng Noel v\xE0 trong s\u1EF1 ch\u1EE9ng ki\u1EBFn c\u1EE7a nh\u1EEFng ng\u01B0\u1EDDi b\u1EA1n th\xE2n th\u01B0\u01A1ng nh\u1EA5t, anh qu\u1EF3 g\u1ED1i trao chi\u1EBFc nh\u1EABn \u01B0\u1EDBc h\u1EB9n. Gi\u1ECDt n\u01B0\u1EDBc m\u1EAFt h\u1EA1nh ph\xFAc l\u0103n tr\xEAn m\xE1 Ph\u01B0\u01A1ng c\xF9ng l\u1EDDi \u0111\u1ED3ng \xFD ngh\u1EB9n ng\xE0o: "Em mu\u1ED1n c\xF9ng anh \u0111i h\u1EBFt cu\u1ED9c \u0111\u1EDDi n\xE0y!"',
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop",
      tag: "C\u1EA7u H\xF4n",
      location: "TP. H\u1ED3 Ch\xED Minh"
    },
    {
      id: "milestone-5",
      year: "2026",
      dateStr: "20.11.2026",
      title: "Ng\xE0y Chung \u0110\xF4i - H\u1EA1nh Ph\xFAc Tr\u1ECDn V\u1EB9n",
      subtitle: "V\u1EC1 chung m\u1ED9t m\xE1i nh\xE0",
      story: "Sau h\u01A1n 6 n\u0103m g\u1EAFn b\xF3, h\xF4m nay ch\xFAng m\xECnh ch\xEDnh th\u1EE9c trao nhau chi\u1EBFc nh\u1EABn c\u01B0\u1EDBi, c\xF9ng b\u01B0\u1EDBc v\xE0o m\u1ED9t ch\u01B0\u01A1ng m\u1EDBi thi\xEAng li\xEAng. C\u1EA3m \u01A1n v\xEC \u0111\xE3 lu\xF4n l\xE0 m\u1EA3nh gh\xE9p ho\xE0n h\u1EA3o nh\u1EA5t c\u1EE7a nhau.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      tag: "L\u1EC5 Th\xE0nh H\xF4n",
      location: "Riverside Palace"
    }
  ],
  loveStoryMessages: [
    {
      author: "Ch\xFA R\u1EC3 - Tu\u1EA5n Anh",
      recipient: "G\u1EEDi Em - Ng\u01B0\u1EDDi B\u1EA1n \u0110\u1EDDi Tri K\u1EF7",
      quote: '"\u0110\u01B0\u1EE3c y\xEAu em l\xE0 \u0111i\u1EC1u d\u1ECBu d\xE0ng nh\u1EA5t m\xE0 cu\u1ED9c s\u1ED1ng n\xE0y \u0111\xE3 ban t\u1EB7ng cho anh."',
      content: "C\u1EA3m \u01A1n em \u0111\xE3 b\u01B0\u1EDBc v\xE0o th\u1EBF gi\u1EDBi c\u1EE7a anh, ki\xEAn nh\u1EABn th\u1EA5u hi\u1EC3u nh\u1EEFng b\u1ED9n b\u1EC1 c\xF4ng vi\u1EC7c v\xE0 lu\xF4n ti\u1EBFp th\xEAm cho anh ni\u1EC1m tin m\u1ED7i ng\xE0y. Anh kh\xF4ng h\u1EE9a m\u1ED9t cu\u1ED9c \u0111\u1EDDi kh\xF4ng c\xF3 s\xF3ng gi\xF3, nh\u01B0ng anh h\u1EE9a s\u1EBD lu\xF4n \u0111\u1EE9ng tr\u01B0\u1EDBc gi\xF3 \u0111\u1EC3 che ch\u1EDF cho em, lu\xF4n l\xE0 b\u1EDD vai v\u1EEFng ch\u1EAFc nh\u1EA5t m\u1ED7i khi em m\u1EC7t m\u1ECFi. Tr\xE2n tr\u1ECDng v\xE0 y\xEAu em b\u1EB1ng c\u1EA3 sinh m\u1EC7nh n\xE0y.",
      dateStr: "20.11.2026"
    },
    {
      author: "C\xF4 D\xE2u - Mai Ph\u01B0\u01A1ng",
      recipient: "G\u1EEDi Anh - \u0110i\u1EC3m T\u1EF1a B\xECnh Y\xEAn C\u1EE7a Em",
      quote: '"Th\u1EBF gi\u1EDBi ngo\xE0i kia r\u1ED9ng l\u1EDBn bao la, nh\u01B0ng ch\u1EC9 c\u1EA7n b\xEAn anh, n\u01A1i \u0111\xE2u c\u0169ng l\xE0 nh\xE0."',
      content: "C\u1EA3m \u01A1n anh v\xEC \u0111\xE3 lu\xF4n bao dung cho nh\u1EEFng n\xE9t tr\u1EBB con c\u1EE7a em, lu\xF4n nh\u1EDB t\u1EEBng s\u1EDF th\xEDch nh\u1ECF nh\u1EB7t v\xE0 ch\u01B0a bao gi\u1EDD bu\xF4ng tay em ngay c\u1EA3 l\xFAc kh\xF3 kh\u0103n nh\u1EA5t. Em tin r\u1EB1ng, khi hai ta c\xF9ng chung m\u1ED9t ch\xED h\u01B0\u1EDBng, c\xF9ng gi\u1EEF tr\u1ECDn ng\u1ECDn l\u1EEDa y\xEAu th\u01B0\u01A1ng, ch\xFAng m\xECnh s\u1EBD vi\u1EBFt n\xEAn m\u1ED9t t\u1ED5 \u1EA5m ng\u1EADp tr\xE0n ti\u1EBFng c\u01B0\u1EDDi v\xE0 s\u1EF1 b\xECnh y\xEAn.",
      dateStr: "20.11.2026"
    }
  ],
  thankYouNote: {
    title: "L\u1EDDi Tri \xC2n S\xE2u S\u1EAFc & L\u1EDDi C\u1EA3m \u01A0n",
    message: "H\xF4n l\u1EC5 c\u1EE7a ch\xFAng con s\u1EBD kh\xF4ng th\u1EC3 tr\u1ECDn v\u1EB9n n\u1EBFu thi\u1EBFu \u0111i s\u1EF1 hi\u1EC7n di\u1EC7n, t\xECnh th\u01B0\u01A1ng v\xE0 l\u1EDDi ch\xFAc ph\xFAc qu\xFD b\xE1u t\u1EEB \u0111\u1EA5ng sinh th\xE0nh, h\u1ECD h\xE0ng hai b\xEAn n\u1ED9i ngo\u1EA1i, c\xF9ng to\xE0n th\u1EC3 qu\xFD c\xF4 ch\xFA, anh ch\u1ECB v\xE0 c\xE1c b\u1EA1n b\xE8 th\xE2n qu\xFD. S\u1EF1 hi\u1EC7n di\u1EC7n v\xE0 l\u1EDDi ch\xFAc c\u1EE7a m\u1ECDi ng\u01B0\u1EDDi l\xE0 m\xF3n qu\xE0 c\u01B0\u1EDBi v\xF4 gi\xE1, l\xE0 \u0111\u1ED9ng l\u1EF1c \u0111\u1EC3 ch\xFAng con c\xF9ng nhau vun \u0111\u1EAFp m\u1ED9t gia \u0111\xECnh nh\u1ECF h\u1EA1nh ph\xFAc v\xE0 b\u1EC1n v\u1EEFng mai sau.",
    signatures: "Tu\u1EA5n Anh & Mai Ph\u01B0\u01A1ng k\xEDnh ch\xFAc"
  }
};
var INITIAL_WISHES = [
  {
    id: "wish-1",
    name: "B\xE1c Quang & B\xE1c Lan",
    relationRole: "\u0110\u1EA1i di\u1EC7n gia \u0111\xECnh",
    content: "Ch\xFAc hai ch\xE1u tr\u0103m n\u0103m h\u1EA1nh ph\xFAc, r\u0103ng long \u0111\u1EA7u b\u1EA1c! Ch\xFAc cho m\xE1i \u1EA5m nh\u1ECF lu\xF4n \u0111\u1EA7y \u1EAFp t\xECnh y\xEAu th\u01B0\u01A1ng, thu\u1EADn h\xF2a v\xE0 s\u1EDBm \u0111\xF3n tin vui nh\xE9.",
    createdAt: "H\xF4m nay l\xFAc 09:30",
    heartCount: 18,
    badge: "Gia \u0111\xECnh"
  },
  {
    id: "wish-2",
    name: "Anh Ho\xE0ng (Team Tech)",
    relationRole: "\u0110\u1ED3ng nghi\u1EC7p",
    content: "Ch\xFAc m\u1EEBng ng\u01B0\u1EDDi anh em ch\xED c\u1ED1t \u0111\xE3 ch\xEDnh th\u1EE9c c\xF3 b\u1EBFn \u0111\u1ED7 an to\xE0n! Ch\xFAc hai v\u1EE3 ch\u1ED3ng lu\xF4n \u0111\u1ED3ng h\xE0nh, c\xF9ng nhau chinh ph\u1EE5c m\u1ECDi \u01B0\u1EDBc m\u01A1 nh\xE9!",
    createdAt: "H\xF4m qua l\xFAc 21:15",
    heartCount: 12,
    badge: "\u0110\u1ED3ng nghi\u1EC7p"
  },
  {
    id: "wish-3",
    name: "Th\xF9y Chi (H\u1ED9i B\u1EA1n Th\xE2n)",
    relationRole: "B\u1EA1n th\xE2n c\xF4 d\xE2u",
    content: "Nh\xECn th\u1EA5y Mai Ph\u01B0\u01A1ng xinh \u0111\u1EB9p trong chi\u1EBFc v\xE1y c\u01B0\u1EDBi l\u1ED9ng l\u1EABy v\xE0 n\u1EE5 c\u01B0\u1EDDi r\u1EA1ng r\u1EE1 c\u1EE7a hai b\u1EA1n, m\xECnh x\xFAc \u0111\u1ED9ng l\u1EAFm. M\xE3i m\xE3i ng\u1ECDt ng\xE0o nh\u01B0 ng\xE0y \u0111\u1EA7u nh\xE9 \u0111\xF4i b\u1EA1n tuy\u1EC7t v\u1EDDi!",
    createdAt: "H\xF4m qua l\xFAc 19:40",
    heartCount: 24,
    badge: "B\u1EA1n th\xE2n"
  }
];

// src/server/cloudflare-worker.ts
var edgeWishes = [...INITIAL_WISHES];
var edgeRSVPs = [];
var cloudflare_worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    try {
      if (pathname === "/api/health") {
        return new Response(
          JSON.stringify({
            status: "ok",
            runtime: "Cloudflare Worker / Pages Function",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }),
          { headers: corsHeaders }
        );
      }
      if (pathname === "/api/wedding-info") {
        return new Response(
          JSON.stringify({
            success: true,
            data: DEFAULT_WEDDING_DATA
          }),
          { headers: corsHeaders }
        );
      }
      if (pathname === "/api/wishes") {
        if (request.method === "GET") {
          return new Response(
            JSON.stringify({
              success: true,
              total: edgeWishes.length,
              data: edgeWishes
            }),
            { headers: corsHeaders }
          );
        }
        if (request.method === "POST") {
          const body = await request.json();
          if (!body.name || !body.content) {
            return new Response(
              JSON.stringify({ success: false, message: "Vui l\xF2ng nh\u1EADp t\xEAn v\xE0 l\u1EDDi ch\xFAc." }),
              { status: 400, headers: corsHeaders }
            );
          }
          const newWish = {
            id: "cf-wish-" + Date.now(),
            name: body.name.trim(),
            relationRole: body.relationRole || "Kh\xE1ch qu\xFD",
            content: body.content.trim(),
            createdAt: "V\u1EEBa xong",
            heartCount: 1,
            badge: body.badge || "Kh\xE1ch m\u1EDDi"
          };
          edgeWishes.unshift(newWish);
          return new Response(
            JSON.stringify({ success: true, message: "G\u1EEDi l\u1EDDi ch\xFAc th\xE0nh c\xF4ng!", data: newWish }),
            { status: 201, headers: corsHeaders }
          );
        }
      }
      if (pathname === "/api/rsvp") {
        if (request.method === "GET") {
          return new Response(
            JSON.stringify({
              success: true,
              totalRecords: edgeRSVPs.length,
              data: edgeRSVPs
            }),
            { headers: corsHeaders }
          );
        }
        if (request.method === "POST") {
          const body = await request.json();
          if (!body.guestName) {
            return new Response(
              JSON.stringify({ success: false, message: "Vui l\xF2ng nh\u1EADp h\u1ECD v\xE0 t\xEAn." }),
              { status: 400, headers: corsHeaders }
            );
          }
          const newRSVP = {
            id: "cf-rsvp-" + Date.now(),
            guestName: body.guestName.trim(),
            role: body.role || "ban",
            attending: body.attending || "yes",
            attendeesCount: Number(body.attendeesCount) || 1,
            phone: body.phone?.trim(),
            dietRequirement: body.dietRequirement?.trim(),
            message: body.message?.trim(),
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          edgeRSVPs.unshift(newRSVP);
          if (body.message && body.message.trim().length > 3) {
            edgeWishes.unshift({
              id: "cf-wish-from-rsvp-" + Date.now(),
              name: body.guestName.trim(),
              relationRole: "Kh\xE1ch qu\xFD",
              content: body.message.trim(),
              createdAt: "V\u1EEBa xong",
              heartCount: 1,
              badge: "X\xE1c nh\u1EADn tham d\u1EF1"
            });
          }
          return new Response(
            JSON.stringify({ success: true, message: "X\xE1c nh\u1EADn th\xE0nh c\xF4ng!", data: newRSVP }),
            { status: 201, headers: corsHeaders }
          );
        }
      }
      return new Response(
        JSON.stringify({ error: "Endpoint not found" }),
        { status: 404, headers: corsHeaders }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message || "Server error" }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
export {
  cloudflare_worker_default as default
};
