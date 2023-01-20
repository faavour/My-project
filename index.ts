
import * as digitalocean from "@pulumi/digitalocean";
import * as kubernetes from "@pulumi/kubernetes";

// This Create a new DigitalOcean Kubernetes cluster
const cluster = new digitalocean.KubernetesCluster("do-cluster", {
    region: digitalocean.Region.NYC1,
    version: "latest",
    nodePool: {
        name: "default",
        size: digitalocean.DropletSlug.DropletS2VCPU2GB,
        nodeCount: 3,
    },
});

export const kubeconfig = cluster.kubeConfigs[0].rawConfig;


// Create a backend deployment and service
const backendDeployment = new kubernetes.apps.v1.Deployment("my-backend", {
    spec: {
        selector: { matchLabels: { app: "my-backend" } },
        replicas: 1,
        template: {
            metadata: { labels: { app: "my-backend" } },
            spec: {
                containers: [{
                    name: "my-backend",
                    image: "faavour/my-backend-image:latest",
                    env: [
                        { name: "DATABASE_URL", value: `postgres://example-user:example-password@example-db-svc:5432/example-db` },
                    ],
                    ports: [{ containerPort: 3000 }],
                }],
            },
        },
    },
});