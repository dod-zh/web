---
type: "session"
sessionId: "workshops/alvaro-revuelta-m"
---

In this workshop, participants will learn how to build secure container images. The session will cover essential security practices throughout the image lifecycle, from development to deployment, ensuring that containers are resilient against common vulnerabilities and threats.

Attendees will start with an overview of container security principles. The workshop will then guide participants through practical steps to build secure images using Docker, including:

- Base Image Selection: Choosing secure, minimal base images to reduce vulnerabilities.

- Dockerfile Best Practices: Writing Dockerfiles with security in mind, including multi-stage builds, reducing image layers, and avoiding sensitive data leaks.

- Dependency Management: Scanning and managing dependencies to prevent introducing vulnerabilities.

- Image Hardening: Techniques for hardening images, such as running as non-root users and setting file permissions.

- Finally, deploying in a cluster, using GitOps tools such as ArgoCD and SealedSecrets.

We will use several tools such as Trivy for image scanning, Dive to inspect the layers of an image and some pentesting tools that automatically test against a benchmark.

The workshop will also cover strategies for continuously monitoring and updating images to maintain security over time.
