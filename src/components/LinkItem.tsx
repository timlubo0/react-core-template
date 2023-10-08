import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
  active?: boolean;
}

export default function LinkItem({ label, to, active = false }: Props) {
  return (
    <Link key={label} to={to}>
      {label}
    </Link>
  );
}
