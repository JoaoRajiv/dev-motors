import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'

export async function getDataHome() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/objects/68acb61104ea77b1e31e559a?pretty=true&read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata,type`, {next:{revalidate: 120}})

        if(!res.ok){
            throw new Error("Failed to fetch data");
        }
        return res.json();
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export async function getSubmenu() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/objects?pretty=true&query=%7B%22type%22%3A%22pages%22%7D&limit=10&skip=0&read_key=${process.env.READ_KEY}&depth=1&props=slug%2Ctitle`, {next: {revalidate: 120}})

        if(!res.ok){
            throw new Error("Failed to fetch data");
        }

        return res.json();

    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export async function getItemBySlug(itemslug: string){
    const baseUrl = `${process.env.NEXT_PUBLIC_API_KEY}/objects`

    // Definindo o objeto de consulta pelo slug
    const queryParams = new URLSearchParams({
        query: JSON.stringify({
            slug: itemslug
        }),
        props : "slug, title, content, metadata",
        read_key: process.env.READ_KEY as string
    })

    const url = `${baseUrl}?${queryParams.toString()}`

    try{
        const res = await fetch(url, {next: {revalidate: 120}})
        if (!res.ok){
            throw new Error("Failed get item by slug")
        }
        return res.json()
    } catch(err){
        //console.log(err)
        revalidatePath("/")
        redirect("/")
    }
}

//https://api.cosmicjs.com/v3/buckets/devmotors-production-b61165a0-81e6-11f0-ac30-c151f782a4f8/objects?pretty=true&query=%7B%22type%22%3A%22pages%22%7D&limit=10&skip=0&read_key=glPyMyB8QoIn99ygiJ3NKNX4NtwRIlhH8yRJ2yoVnurO1Ew3dB&depth=1&props=slug%2Ctitle&sort=-order