import { ChartLine, Users,House } from "lucide-react";
export default function SideNav() {
  return (
    <div className="flex flex-col bg-white shadow border border-gray-200 p-4 height-full h-screen">
      <ul>
        <li className="mb-5">
          <a href="/clients" className="hover:text-gray-400">
          <House />
          </a>
        </li>
        <li className="mb-5">
          <a href="/clients" className="hover:text-gray-400">
            <Users />
          </a>
        </li>
        <li className="mb-5">
          <a href="/analytics" className="hover:text-gray-400">
            <ChartLine />
          </a>
        </li>
      </ul>
    </div>
  );
}
