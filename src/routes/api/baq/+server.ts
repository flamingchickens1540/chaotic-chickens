import { warn } from "console";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({}: any) => {
    const res = await fetch('http://queue.team1540.org/backend/api/get_match', {method: "GET"});
    console.info("hi");
    console.info(res)
    if (!res.ok) {
        warn(`BAQ request failed: ${res.status}`);
        return error(res.status);
    }
    return await res.json();

}
