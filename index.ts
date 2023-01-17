
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
