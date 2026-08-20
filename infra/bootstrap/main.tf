data "aws_caller_identity" "current" {}

locals {
  name_prefix = lower(replace("${var.project_name}-${var.environment}", "_", "-"))

  tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
      Scope       = "iam-bootstrap"
    },
    var.tags
  )
}

resource "aws_iam_user" "deploy" {
  name          = var.deploy_user_name
  force_destroy = false

  tags = local.tags
}

data "aws_iam_policy_document" "deploy_assume_role" {
  statement {
    sid     = "DeployUserCanAssumeRole"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    resources = [aws_iam_role.deploy.arn]
  }
}

resource "aws_iam_user_policy" "deploy_assume_role" {
  name   = "${local.name_prefix}-assume-deploy-role"
  user   = aws_iam_user.deploy.name
  policy = data.aws_iam_policy_document.deploy_assume_role.json
}

data "aws_iam_policy_document" "deploy_role_trust" {
  statement {
    sid     = "DeployUserTrust"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "AWS"
      identifiers = [aws_iam_user.deploy.arn]
    }

    dynamic "condition" {
      for_each = var.require_mfa_for_assume_role ? [1] : []

      content {
        test     = "Bool"
        variable = "aws:MultiFactorAuthPresent"
        values   = ["true"]
      }
    }
  }
}

resource "aws_iam_role" "deploy" {
  name                 = var.deploy_role_name
  assume_role_policy   = data.aws_iam_policy_document.deploy_role_trust.json
  max_session_duration = var.max_session_duration_seconds

  tags = local.tags
}

resource "aws_iam_role_policy_attachment" "deploy" {
  for_each = toset(var.deploy_policy_arns)

  role       = aws_iam_role.deploy.name
  policy_arn = each.value
}
