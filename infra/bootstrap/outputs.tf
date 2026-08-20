output "account_id" {
  description = "AWS account ID where the bootstrap resources are created."
  value       = data.aws_caller_identity.current.account_id
}

output "deploy_user_name" {
  description = "IAM deploy user name."
  value       = aws_iam_user.deploy.name
}

output "deploy_user_arn" {
  description = "IAM deploy user ARN."
  value       = aws_iam_user.deploy.arn
}

output "deploy_role_name" {
  description = "IAM deploy role name."
  value       = aws_iam_role.deploy.name
}

output "deploy_role_arn" {
  description = "IAM deploy role ARN."
  value       = aws_iam_role.deploy.arn
}

output "assume_role_command" {
  description = "Example command for assuming the deploy role. Add --serial-number and --token-code when MFA is enabled."
  value       = "aws sts assume-role --role-arn ${aws_iam_role.deploy.arn} --role-session-name powermicros-deploy"
}
