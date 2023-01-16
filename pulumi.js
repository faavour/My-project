const pulumi = require("@pulumi/pulumi");
const digitalocean = require("@pulumi/digitalocean");

// This Create a new DigitalOcean Kubernetes cluster
const cluster = new digitalocean.KubernetesCluster("my-cluster", {
    region: "nyc1",
    version: "1.19",
    nodePool: {
        name: "default",
        size: "s-1vcpu-2gb",
        nodeCount: 2,
    },
