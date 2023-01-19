
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
// const backendDeployment = new kubernetes.apps.v1.Deployment("example-backend", {
//     spec: {
//         selector: { matchLabels: { app: "example-backend" } },
//         replicas: 1,
//         template: {
//             metadata: { labels: { app: "example-backend" } },
//             spec: {
//                 containers: [{
//                     name: "example-backend",
//                     image: "example-backend-image",
//                     env: [
//                         { name: "DATABASE_URL", value: `postgres://example-user:example-password@example-db-svc:5432/example-db` },
//                     ],
//                     ports: [{ containerPort: 3000 }],
//                 }],
//             },
//         },
//     },
// });