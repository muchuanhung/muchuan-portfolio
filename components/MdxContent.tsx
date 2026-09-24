import { MDXRemote, type MDXComponents } from 'next-mdx-remote-client/rsc'

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 text-2xl font-black tracking-tight md:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-xl font-bold tracking-tight" {...props} />,
  p: (props) => <p className="mt-4 leading-8" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 marker:text-highlight" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 leading-8 marker:text-highlight" {...props} />,
  a: (props) => <a className="text-highlight underline underline-offset-4 hover:text-fg" {...props} />,
  strong: (props) => <strong className="font-bold text-fg" {...props} />,
  code: (props) => <code className="rounded bg-surface-2 px-1.5 py-0.5 text-[0.9em]" {...props} />,
  pre: (props) => <pre className="mt-6 overflow-x-auto rounded-2xl bg-surface p-5 text-sm leading-7" {...props} />,
  blockquote: (props) => <blockquote className="mt-6 border-l-2 border-highlight pl-5 text-muted" {...props} />,
  hr: () => <hr className="my-12 border-line" />,
}

/** 渲染 content/*.mdx 的內文（Server Component） */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-[68ch] text-fg">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
