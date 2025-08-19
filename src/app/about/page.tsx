import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Me | LightWrite',
  description: 'My background, skills, and experience in DevOps and Cloud Engineering.',
};

const skills = {
  "Cloud & Virtualization": ["AWS", "GCP", "Docker", "Kubernetes", "VMware"],
  "Infrastructure as Code": ["Terraform", "Ansible", "CloudFormation"],
  "CI/CD": ["GitHub Actions", "Jenkins", "GitLab CI"],
  "Scripting & Programming": ["Bash", "Python", "Go", "TypeScript"],
  "Monitoring & Logging": ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
};

const experience = [
    {
        role: "Senior DevOps Engineer",
        company: "Tech Solutions Inc.",
        period: "2020 - Present",
        description: "Leading the design and implementation of scalable CI/CD pipelines, managing Kubernetes clusters on AWS, and automating infrastructure provisioning with Terraform.",
    },
    {
        role: "Cloud Engineer",
        company: "Cloud Innovators",
        period: "2017 - 2020",
        description: "Migrated on-premise infrastructure to GCP, implemented monitoring solutions using Prometheus and Grafana, and developed automation scripts in Python.",
    }
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">About Me</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A passionate DevOps engineer with a focus on automation and cloud-native technologies.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(skills).map(([category, list]) => (
            <div key={category}>
              <h3 className="font-semibold mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {list.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {experience.map((job, index) => (
                <div key={index}>
                    <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="text-xl font-bold">{job.role}</h3>
                        <p className="text-sm text-muted-foreground">{job.period}</p>
                    </div>
                    <p className="text-md font-semibold text-primary">{job.company}</p>
                    <p className="mt-2 text-muted-foreground">{job.description}</p>
                    {index < experience.length - 1 && <Separator className="my-6" />}
                </div>
            ))}
        </CardContent>
      </Card>

    </div>
  );
}
