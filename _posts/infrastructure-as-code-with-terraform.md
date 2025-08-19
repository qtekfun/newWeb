---
title: "Infrastructure as Code with Terraform"
date: "2023-09-15"
tags: ["terraform", "iac", "cloud"]
summary: "Learn how to manage your infrastructure with Terraform. A practical guide to writing, planning, and applying infrastructure changes."
---

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
