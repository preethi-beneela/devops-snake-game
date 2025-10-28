terraform {
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.0" }
    random = { source = "hashicorp/random" }
  }
}

provider "azurerm" {
  features {}
}

resource "random_string" "suffix" {
  length  = 6
  lower   = true
  number  = true
  upper   = false
  special = false
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-mini-game-${random_string.suffix.result}"
  location = "eastus"
}

resource "azurerm_container_registry" "acr" {
  name                = "acrminigame${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-mini-game-${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "aksminigame${random_string.suffix.result}"
  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }
  identity {
    type = "SystemAssigned"
  }
}

output "acr_name" {
  value = azurerm_container_registry.acr.name
}

output "aks_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "resource_group" {
  value = azurerm_resource_group.rg.name
}