
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

// This will create a kubernetes deployment

const provider = new kubernetes.Provider("do-k8s", { kubeconfig })

const appLabels = { "app": "app-nginx" };
const app = new kubernetes.apps.v1.Deployment("do-app-dep", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 5,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [{
                    name: "nginx",
                    image: "nginx",
                }],
            },
        },
    },
}, { provider });


const appService = new kubernetes.core.v1.Service("do-app-svc", {
    spec: {
        type: "LoadBalancer",
        selector: app.spec.template.metadata.labels,
        ports: [{ port: 80 }],
    },
}, { provider });

export const ingressIp = appService.status.loadBalancer.ingress[0].ip;