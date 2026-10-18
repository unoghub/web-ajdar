import { client } from "@/lib/orpc";

export default async function BultenPage() {
    const healthCheck = await client.healthCheck()

    return healthCheck;
}