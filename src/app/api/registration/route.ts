import { handleError, isErrorWithMessage } from "@/lib/error/error-handler";
import { createRegistration } from "@/lib/registration/create-registration";
import {} from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const results = await createRegistration(body);
    if (results) {
      return new Response(JSON.stringify(results), {
        status: 200,
      });
    }
  } catch (e) {
    console.log(e);
    if (isErrorWithMessage(e)) {
      const error = handleError(e);

      return new Response(JSON.stringify(error), { status: 500 });
    }
  }
}
