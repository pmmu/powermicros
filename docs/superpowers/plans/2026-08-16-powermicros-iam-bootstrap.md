# PowerMicros IAM Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Terraform bootstrap layer that creates a non-root deploy user and MFA-protected deploy role for future PowerMicros AWS infrastructure work.

**Architecture:** Bootstrap Terraform lives separately under `infra/bootstrap` so it can be applied once with current privileged credentials. It creates identity-only resources and intentionally avoids generating access keys or application resources.

**Tech Stack:** Terraform, AWS IAM, AWS STS.

## Global Constraints

- Do not apply Terraform or create AWS resources without explicit approval.
- Do not create access keys in Terraform state.
- Require MFA for role assumption by default.
- Keep bootstrap state separate from future application infrastructure state.

---

### Task 1: IAM Bootstrap Terraform

**Files:**
- Create: `infra/bootstrap/versions.tf`
- Create: `infra/bootstrap/variables.tf`
- Create: `infra/bootstrap/main.tf`
- Create: `infra/bootstrap/outputs.tf`
- Create: `infra/bootstrap/README.md`

**Interfaces:**
- Consumes: local AWS profile with permission to create IAM users, policies, roles, and role policy attachments.
- Produces: `powermicros-deployer` IAM user and `powermicros-deploy-role` IAM role.

- [x] **Step 1: Add Terraform provider constraints**

Create `versions.tf` with Terraform `>= 1.5.0` and AWS provider `~> 6.0`.

- [x] **Step 2: Add variables**

Create variables for region, project name, environment, deploy user name, deploy role name, deploy policy ARNs, MFA enforcement, session duration, and tags.

- [x] **Step 3: Add IAM resources**

Create the deploy user, deploy role trust policy, user assume-role policy, deploy role, and deploy role policy attachments.

- [x] **Step 4: Add outputs**

Output the account ID, deploy user name/ARN, deploy role name/ARN, and an example assume-role command.

- [x] **Step 5: Add README**

Document the first-time apply flow, post-apply MFA/profile steps, and permission-tightening path.

- [x] **Step 6: Verify formatting and validation**

Run:

```bash
terraform -chdir=infra/bootstrap fmt -check
terraform -chdir=infra/bootstrap init -backend=false
terraform -chdir=infra/bootstrap validate
```

Expected result: formatting check succeeds and Terraform validates.
