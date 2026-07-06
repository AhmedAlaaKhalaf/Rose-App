import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { useTranslations } from "next-intl";

interface RememberMeProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function RememberMe({ value, onChange }: RememberMeProps) {
  // Translation
  const t = useTranslations("login");

  return (
    <Field className="pt-5" orientation="horizontal">
      <Checkbox checked={value} onCheckedChange={(v) => onChange(!!v)} />
      <FieldLabel>{t("rememberMe")}</FieldLabel>
    </Field>
  );
}
