import { useState } from "react";
import { Copy, Check, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const LICENSE_PREVIEW = `MIT License

Copyright (c) 2024 PocketMC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...`;

export default function OpenSource() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(LICENSE_PREVIEW);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 scroll-reveal">
            Proudly <span className="text-gradient-green">Open Source</span>
          </h2>
          <p className="text-muted-foreground mb-8 scroll-reveal" data-delay="100">
            MIT licensed. Fork it, modify it, contribute to it. PocketMC belongs to the community.
          </p>

          <div className="glass rounded-xl p-4 text-left relative scroll-reveal" data-delay="200">
            <pre className="text-xs text-muted-foreground font-mono overflow-x-auto whitespace-pre-wrap">
              {LICENSE_PREVIEW}
            </pre>
            <Button
              variant="ghost"
              size="icon"
              onClick={copy}
              className="absolute top-3 right-3 w-8 h-8"
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="mt-6 scroll-reveal" data-delay="300">
            <a href="https://github.com/divyviradiya2/pocket-mc-desktop" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" /> View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
