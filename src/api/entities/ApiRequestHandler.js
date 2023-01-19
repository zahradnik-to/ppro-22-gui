import EventEntity from "./EventEntity";
import VariantEntity from "./VariantEntity";
import UserEntity from "./UserEntity";
import OrderEntity from "./OrderEntity";

const ApiRequestHandler = {
  Event: EventEntity,
  Variant: VariantEntity,
  User: UserEntity,
  Orders: OrderEntity,
}

export default ApiRequestHandler;