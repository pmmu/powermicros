variable "aws_region" {
  description = "AWS region used for provider initialization. IAM is global, but the provider still requires a region."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Short project name used in IAM resource names and tags."
  type        = string
  default     = "powermicros"
}

variable "environment" {
  description = "Environment label used in tags."
  type        = string
  default     = "prod"
}

variable "deploy_user_name" {
  description = "IAM user created for deploy access. Terraform intentionally does not create a password or access key for this user."
  type        = string
  default     = "powermicros-deployer"
}

variable "deploy_role_name" {
  description = "IAM role assumed by the deploy user for Terraform deployments."
  type        = string
  default     = "powermicros-deploy-role"
}

variable "deploy_policy_arns" {
  description = "Managed policy ARNs attached to the deploy role. AdministratorAccess is intentionally explicit for bootstrap; tighten later after the infrastructure surface is stable."
  type        = list(string)
  default     = ["arn:aws:iam::aws:policy/AdministratorAccess"]
}

variable "require_mfa_for_assume_role" {
  description = "Require MFA when the deploy user assumes the deploy role."
  type        = bool
  default     = true
}

variable "max_session_duration_seconds" {
  description = "Maximum STS session duration for the deploy role."
  type        = number
  default     = 3600

  validation {
    condition     = var.max_session_duration_seconds >= 3600 && var.max_session_duration_seconds <= 43200
    error_message = "max_session_duration_seconds must be between 3600 and 43200 seconds."
  }
}

variable "tags" {
  description = "Additional tags applied to bootstrap resources."
  type        = map(string)
  default     = {}
}
