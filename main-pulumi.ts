import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// This Create a new DigitalOcean Kubernetes cluster
const cluster = new digitalocean.KubernetesCluster("my-pulumi-cluster", {
    region: "nyc1",
    version: "1.19",
    nodePool: {
        name: "pulumi-project",
        size: "s-1vcpu-2gb",
        nodeCount: 2,
    },
});

// This exports the kubeconfig for the cluster
export const kubeconfig = cluster.kubeconfig;
