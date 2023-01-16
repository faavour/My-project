import * as k8s from "@pulumi/kubernetes";

const deployment = new k8s.apps.v1.Deployment("example-app", {
    spec: {
        selector: { matchLabels: { app: "example-app" } },
        replicas: 2,
        template: {
            metadata: { labels: { app: "example-app" } },
            spec: {
                containers: [{
                    name: "example-app",
                    image: "example-app-image",
                }],
            },
        },
    },
});

const service = new k8s.core.v1.Service("example-app-svc", {
    metadata: { labels: { app: "example-app" } },
    spec: {
        selector: { app: "example-app" },
        ports: [{ port: 80, targetPort: 8080 }],
        type: "ClusterIP",
    },
});
