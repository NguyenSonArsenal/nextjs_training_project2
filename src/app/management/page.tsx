import {redirect} from "next/navigation";
import {getManagementPath} from "@/util/helper";

export default function Home() {
  redirect(getManagementPath('dashboard'));
  return null; // Không render gì cả
}