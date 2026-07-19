import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AppLegalFooter } from "@/shared/components/AppLegalFooter";

const DOCS = {
  terms: { file: "terms.md", title: "이용약관" },
  privacy: { file: "privacy.md", title: "개인정보처리방침" },
  refund: { file: "refund.md", title: "코인 충전 및 환불 안내" },
} as const;

type DocKey = keyof typeof DOCS;

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const title = doc in DOCS ? DOCS[doc as DocKey].title : "약관";
  return { title, robots: { index: true, follow: true } };
}

// 내부용 초안 경고(블록쿼트)는 공개 페이지에서 제거.
function loadDoc(doc: DocKey): string {
  const raw = readFileSync(
    join(process.cwd(), "public", "legal", DOCS[doc].file),
    "utf-8",
  );
  return raw
    .split("\n")
    .filter(
      (line) =>
        !(
          line.trimStart().startsWith(">") &&
          /초안|발효\s*전|법률\s*전문가|법률\s*검토|벤치/.test(line)
        ),
    )
    .join("\n")
    .trim();
}

const MD_STYLE =
  "text-[13.5px] leading-relaxed text-neutral-800 " +
  "[&_h1]:text-[22px] [&_h1]:font-bold [&_h1]:mb-5 " +
  "[&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-neutral-900 " +
  "[&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-1.5 " +
  "[&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 " +
  "[&_strong]:font-semibold [&_a]:underline " +
  "[&_table]:w-full [&_table]:my-4 [&_table]:text-[12.5px] [&_th]:border [&_th]:border-neutral-300 [&_th]:px-2 [&_th]:py-1 [&_th]:bg-neutral-100 [&_td]:border [&_td]:border-neutral-300 [&_td]:px-2 [&_td]:py-1";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  if (!(doc in DOCS)) notFound();
  const content = loadDoc(doc as DocKey);
  return (
    <>
      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className={MD_STYLE}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </main>
      <AppLegalFooter />
    </>
  );
}
