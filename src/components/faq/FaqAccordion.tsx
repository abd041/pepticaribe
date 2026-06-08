"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/translations/homeContent";

type FaqAccordionProps = {
  items: FaqItem[];
  idPrefix?: string;
};

export function FaqAccordion({ items, idPrefix = "faq" }: FaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="faq-premium-list ref-faq-list polish-faq-list final8-faq-list">
      {items.map((item, i) => {
        const isOpen = openFaq === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const triggerId = `${idPrefix}-trigger-${i}`;
        return (
          <article
            key={item.question}
            className={`faq-premium-card ref-faq-item polish-faq-item${
              isOpen ? " faq-premium-card--open polish-faq-item-open" : ""
            }`}
          >
            <button
              type="button"
              id={triggerId}
              className="faq-premium-trigger ref-faq-trigger polish-faq-trigger"
              onClick={() => setOpenFaq(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="faq-premium-trigger-text">{item.question}</span>
              <span className="faq-premium-expand" aria-hidden>
                <Plus className="faq-premium-expand-icon" strokeWidth={2} />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`faq-premium-answer-wrap polish-faq-answer-wrap${
                isOpen ? " polish-faq-answer-open" : ""
              }`}
            >
              <div className="faq-premium-answer-inner">
                <p className="faq-premium-answer ref-faq-answer">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
