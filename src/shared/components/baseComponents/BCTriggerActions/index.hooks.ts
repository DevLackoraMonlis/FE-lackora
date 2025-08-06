import { useGetPolicyManagementActions } from "@/http/generated/policy-management";
import { PolicySetAttribute, PolicyTickets } from "@/shared/icons/components/policy";
import { PolicyChatBubble, PolicyEmail } from "@/shared/icons/components/policy";

export function usePolicyManagementActions(enabled = true) {
  const policyActions = useGetPolicyManagementActions({
    query: {
      enabled,
      select: (res) => {
        const Execution = res.data?.Execution.map((item) => item);
        const Notification = res.data?.Notification.map((item) => item);
        return { ...res.data, Execution, Notification };
      },
    },
  });

  return { policyActions };
}

export function useIconPolicyManagementActions() {
  const getPolicyActionIcon = (type: string) =>
    ({
      email: PolicyEmail,
      ticket: PolicyTickets,
      set_attribute: PolicySetAttribute,
      sms: PolicyChatBubble,
    }[type]);

  return { getPolicyActionIcon };
}
