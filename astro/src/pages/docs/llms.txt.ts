import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const docs = await getCollection("docs");

function getDocsUrl(docId: string): string {
    let path = docId;

    if (path === "index") {
        return "https://fusionauth.io/docs/";
    }

    if (path.endsWith("/index")) {
        path = path.replace(/\/index$/, "");
    }

    return `https://fusionauth.io/docs/${path}/`;
}

export const GET: APIRoute = async ({}) => {
    return new Response(
        `## FusionAuth.io Documentation\n\n${docs
            .map((doc) => {
                return `- [${doc.data.title}](${getDocsUrl(doc.id)})\n`;
            })
            .join("")}`,
        { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
};
