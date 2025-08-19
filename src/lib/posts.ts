import type { Post } from './types';

const posts: Post[] = [
  {
    slug: 'mastering-kubernetes-deployments',
    title: 'Mastering Kubernetes Deployments',
    date: '2023-10-26',
    tags: ['kubernetes', 'devops', 'ci-cd'],
    summary: 'A deep dive into Kubernetes deployments, services, and stateful sets for robust application management.',
    content: `
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
    `,
  },
  {
    slug: 'infrastructure-as-code-with-terraform',
    title: 'Infrastructure as Code with Terraform',
    date: '2023-09-15',
    tags: ['terraform', 'iac', 'cloud'],
    summary: 'Learn how to manage your infrastructure with Terraform. A practical guide to writing, planning, and applying infrastructure changes.',
    content: `
      <h2 class="text-2xl font-bold mb-4">What is Infrastructure as Code (IaC)?</h2>
      <p class="mb-4">Infrastructure as Code is the management of infrastructure (networks, virtual machines, load balancers, and connection topology) in a descriptive model, using the same versioning as DevOps team uses for source code.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-4">Getting Started with Terraform</h3>
      <p class="mb-4">Terraform uses its own configuration language, HCL (HashiCorp Configuration Language). It allows you to define resources from various providers.</p>

      <pre><code class="language-hcl">
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "HelloWorld"
  }
}
        </code></pre>

      <p>This example HCL code configures an AWS provider and defines a single EC2 instance. Running <code>terraform apply</code> will provision this resource in your AWS account.</p>
    `,
  },
  {
    slug: 'building-a-ci-cd-pipeline-with-github-actions',
    title: 'Building a CI/CD Pipeline with GitHub Actions',
    date: '2023-08-01',
    tags: ['ci-cd', 'github-actions', 'automation'],
    summary: 'A step-by-step guide to automating your build, test, and deployment workflow using GitHub Actions.',
    content: `
      <h2 class="text-2xl font-bold mb-4">Understanding GitHub Actions</h2>
      <p class="mb-4">GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-4">Example Workflow File</h3>
      <p class="mb-4">Workflows are defined by a YAML file checked in to your repository in the <code>.github/workflows</code> directory.</p>

      <pre><code class="language-yaml">
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
        </code></pre>
      <p>This workflow triggers on pushes and pull requests to the main branch, and it runs tests across multiple Node.js versions.</p>
    `,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const allTags = posts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}

export function getPostsByTag(tag: string): Post[] {
    return getAllPosts().filter(post => post.tags.includes(tag));
}
