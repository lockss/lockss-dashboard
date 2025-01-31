export type LockssServices = typeof lockssServices;

export const lockssServices = {
    services: [
        {
            svcName: "repo",
            svcDesc: "Repository Service",
        },
        {
            svcName: "cfg",
            svcDesc: "Configuration Service",
        },
        {
            svcName: "crawler",
            svcDesc: "Crawler Service",
        },
        {
            svcName: "poller",
            svcDesc: "Poller Service",
        },
        {
            svcName: "mdq",
            svcDesc: "Metadata Service",
        },
        {
            svcName: "mdx",
            svcDesc: "Metadata Extraction Service",
        },
    ]
}
