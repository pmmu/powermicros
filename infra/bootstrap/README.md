# PowerMicros IAM Bootstrap

This Terraform layer creates the deploy identity for future PowerMicros infrastructure work.

It creates:

- IAM user: `powermicros-deployer`
- IAM role: `powermicros-deploy-role`
- A user policy allowing the deploy user to assume only that deploy role
- Managed policy attachments on the deploy role
- MFA requirement on role assumption by default

It intentionally does not create:

- Access keys
- Console password
- Terraform remote state
- Application infrastructure

Do not store access keys or generated secrets in Terraform state.

## First-time apply

Run this once with the existing privileged profile:

```bash
cd infra/bootstrap
terraform init
terraform plan -out bootstrap.tfplan
terraform apply bootstrap.tfplan
```

## After apply

1. Add MFA to the `powermicros-deployer` user.
2. Create credentials outside Terraform if CLI access is required.
3. Configure a local AWS profile that assumes the deploy role.

Example profile shape:

```ini
[profile powermicros-deployer]
aws_access_key_id = created-outside-terraform
aws_secret_access_key = created-outside-terraform
region = us-east-1

[profile powermicros-prod]
source_profile = powermicros-deployer
role_arn = arn:aws:iam::<account-id>:role/powermicros-deploy-role
mfa_serial = arn:aws:iam::<account-id>:mfa/powermicros-deployer
region = us-east-1
```

Use `powermicros-prod` for the real infrastructure Terraform.

## Tightening permissions later

The deploy role currently uses `AdministratorAccess` because the upcoming app deployment needs to create several AWS services: ECR, ECS, RDS, S3, CloudFront, Route 53, Secrets Manager, IAM roles, and log groups.

After the production Terraform surface stabilizes, replace `deploy_policy_arns` with a narrower customer-managed policy.
