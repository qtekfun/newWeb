---
title: "Building a CI/CD Pipeline with GitHub Actions"
date: "2023-08-01"
tags: ["ci-cd", "github-actions", "automation"]
summary: "A step-by-step guide to automating your build, test, and deployment workflow using GitHub Actions."
---

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
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
</code></pre>
<p>This workflow triggers on pushes and pull requests to the main branch, and it runs tests across multiple Node.js versions.</p>
