---
title: "Mastering Kubernetes Deployments"
date: "2023-10-26"
tags: ["kubernetes", "devops", "ci-cd"]
summary: "A deep dive into Kubernetes deployments, services, and stateful sets for robust application management."
---

<h2 class="text-2xl font-bold mb-4">Introduction to Kubernetes</h2>
<p class="mb-4">Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery.</p>

<h3 class="text-xl font-bold mt-6 mb-4">Core Concepts: Deployments</h3>
<p class="mb-4">A Deployment provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.</p>

<pre><code class="language-yaml">
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
</code></pre>

<p>This YAML file defines a simple NGINX deployment with 3 replicas. Applying this configuration will ensure that three pods running the specified NGINX image are always available.</p>
