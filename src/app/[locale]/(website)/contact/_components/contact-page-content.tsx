"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHead, SectionTitle } from "@/components/ui/section-header";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  { key: "email", icon: Mail },
  { key: "phone", icon: Phone },
  { key: "address", icon: MapPin },
  { key: "hours", icon: Clock },
] as const;

export default function ContactPageContent() {
  const t = useTranslations("contactPage");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success(t("success"));
    event.currentTarget.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col items-center gap-2 text-center">
        <SectionTitle>{t("title")}</SectionTitle>
        <SectionHead size="sm">{t("subtitle")}</SectionHead>
      </header>

      <div className="gap-8 grid lg:grid-cols-[minmax(0,360px)_1fr] items-start">
        <aside className="space-y-4 bg-maroon-700 p-8 rounded-3xl text-white">
          <h2 className="font-semibold text-xl">{t("info-title")}</h2>

          {CONTACT_INFO.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl"
            >
              <span className="flex justify-center items-center bg-white/15 rounded-full size-10 shrink-0">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-medium text-white/80 text-sm">{t(`${key}-label`)}</p>
                <p className="font-semibold">{t(`${key}-value`)}</p>
              </div>
            </div>
          ))}
        </aside>

        <section className="bg-white dark:bg-zinc-900/40 p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
          <h2 className="mb-6 font-semibold text-maroon-700 dark:text-softPink-200 text-2xl">
            {t("form-title")}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="gap-5 grid sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">{t("name")}</Label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder={t("name-placeholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">{t("email")}</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder={t("email-placeholder")}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-subject">{t("subject")}</Label>
              <Input
                id="contact-subject"
                name="subject"
                placeholder={t("subject-placeholder")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">{t("message")}</Label>
              <Textarea
                id="contact-message"
                name="message"
                placeholder={t("message-placeholder")}
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
              {t("submit")}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
