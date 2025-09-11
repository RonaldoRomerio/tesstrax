import z from "zod"

export const newProjectSchema = z.object({
    project_name: z.string().nonempty(),
    base_path_photos: z.string().nonempty(),
    output_path_photos: z.string().optional().nullable(),
    check_path_project: z.boolean()
}).refine(data => {
    return !data.check_path_project || (data.output_path_photos && data.output_path_photos.length > 0);
}, {
    path: ["output_path_photos"]
})

export type newProjectSchemaType = z.infer<typeof newProjectSchema>