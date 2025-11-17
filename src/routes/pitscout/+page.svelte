<script lang="ts">
	import RadioGroup from "$lib/components/RadioGroup.svelte";

    let drivetrain = $state(data.drivetrain || "Swerve")
</script>

<div>
    <div class="flex flex-col gap-2 p-2">
        <span class="font-heading text-xl font-semibold">DriveTrain</span>
        <RadioGroup labels={["Swerve", "Tank", "Other"]} bind:value={drivetrain} />
    </div>
</div>

