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

