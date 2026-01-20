// 7.1.1 invalidate using onDemandRevalidation revalidatePath
import { revalidatePath, revalidateTag } from "next/cache";

/* export async function GET() {
  // 7.1.2 use revalidatePath
  revalidatePath("/non-deterministic-operations");

  return new Response("Revalidated by Path", { status: 200 });
} */

//   7.2.1 invalidate using onDemandRevalidation revalidateTag so commented the path based revalidation 7.1.1
export async function GET() {
  revalidateTag("non-deterministic-operations", "max");
  return new Response("Revalidated By Tag", { status: 200 });
}
